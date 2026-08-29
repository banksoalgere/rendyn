begin;

create type public.component_grant_type as enum (
  'signup_bonus',
  'monthly',
  'paid'
);

create type public.subscription_status as enum (
  'trialing',
  'active',
  'past_due',
  'canceled',
  'incomplete',
  'unpaid'
);

create table public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  monthly_eligible_from date not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on column public.profiles.monthly_eligible_from is
  'The first calendar month in which the recurring four-component allowance applies. The signup month uses the four-component bonus instead.';

create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  provider text not null,
  provider_customer_id text,
  provider_subscription_id text,
  plan_code text not null,
  status public.subscription_status not null,
  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint subscriptions_provider_check
    check (provider ~ '^[a-z0-9_-]{2,32}$'),
  constraint subscriptions_plan_code_check
    check (plan_code ~ '^[a-z0-9_-]{2,64}$'),
  unique (provider, provider_subscription_id)
);

create index subscriptions_active_user_idx
  on public.subscriptions (user_id, status, current_period_end);

create table public.component_unlocks (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  component_slug text not null,
  grant_type public.component_grant_type not null,
  period_start date,
  unlocked_at timestamptz not null default now(),
  constraint component_unlocks_slug_check
    check (component_slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  constraint component_unlocks_period_check
    check (
      (grant_type = 'monthly' and period_start is not null)
      or (grant_type <> 'monthly' and period_start is null)
    ),
  unique (user_id, component_slug)
);

create index component_unlocks_monthly_idx
  on public.component_unlocks (user_id, period_start)
  where grant_type = 'monthly';

create table public.anonymous_component_unlocks (
  id bigint generated always as identity primary key,
  identity_hash text not null,
  component_slug text not null,
  unlocked_at timestamptz not null default now(),
  constraint anonymous_component_unlocks_identity_hash_check
    check (identity_hash ~ '^[a-f0-9]{64}$'),
  constraint anonymous_component_unlocks_slug_check
    check (component_slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  unique (identity_hash, component_slug)
);

create index anonymous_component_unlocks_identity_idx
  on public.anonymous_component_unlocks (identity_hash);

alter table public.profiles enable row level security;
alter table public.subscriptions enable row level security;
alter table public.component_unlocks enable row level security;
alter table public.anonymous_component_unlocks enable row level security;

create policy "users can read their own profile"
  on public.profiles for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "users can read their own subscriptions"
  on public.subscriptions for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "users can read their own unlocks"
  on public.component_unlocks for select
  to authenticated
  using ((select auth.uid()) = user_id);

create function public.create_profile_for_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (user_id, monthly_eligible_from)
  values (
    new.id,
    (date_trunc('month', current_date)::date + interval '1 month')::date
  )
  on conflict (user_id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.create_profile_for_new_user();

create function public.claim_component_access(p_component_slug text)
returns table (
  allowed boolean,
  newly_unlocked boolean,
  grant_type public.component_grant_type,
  signup_bonus_remaining integer,
  monthly_remaining integer,
  monthly_reset_at timestamptz
)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
  v_existing public.component_unlocks%rowtype;
  v_signup_used integer;
  v_monthly_used integer;
  v_month_start date := date_trunc('month', current_date)::date;
  v_next_month timestamptz := date_trunc('month', now()) + interval '1 month';
  v_monthly_eligible_from date;
  v_is_paid boolean;
begin
  if v_user_id is null then
    raise exception using errcode = '42501', message = 'Authentication required';
  end if;

  if p_component_slug is null
    or p_component_slug !~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'
    or length(p_component_slug) > 120 then
    raise exception using errcode = '22023', message = 'Invalid component slug';
  end if;

  perform pg_advisory_xact_lock(hashtextextended(v_user_id::text, 0));

  insert into public.profiles (user_id, monthly_eligible_from)
  values (
    v_user_id,
    (date_trunc('month', current_date)::date + interval '1 month')::date
  )
  on conflict (user_id) do nothing;

  select * into v_existing
  from public.component_unlocks
  where user_id = v_user_id and component_slug = p_component_slug;

  select count(*)::integer into v_signup_used
  from public.component_unlocks
  where user_id = v_user_id and component_unlocks.grant_type = 'signup_bonus';

  select count(*)::integer into v_monthly_used
  from public.component_unlocks
  where user_id = v_user_id
    and component_unlocks.grant_type = 'monthly'
    and period_start = v_month_start;

  if found and v_existing.id is not null then
    return query select
      true,
      false,
      v_existing.grant_type,
      greatest(0, 4 - v_signup_used),
      greatest(0, 4 - v_monthly_used),
      v_next_month;
    return;
  end if;

  select exists (
    select 1
    from public.subscriptions
    where user_id = v_user_id
      and status in ('trialing', 'active')
      and (current_period_end is null or current_period_end > now())
  ) into v_is_paid;

  if v_is_paid then
    insert into public.component_unlocks (user_id, component_slug, grant_type)
    values (v_user_id, p_component_slug, 'paid');

    return query select true, true, 'paid'::public.component_grant_type,
      greatest(0, 4 - v_signup_used), greatest(0, 4 - v_monthly_used), v_next_month;
    return;
  end if;

  if v_signup_used < 4 then
    insert into public.component_unlocks (user_id, component_slug, grant_type)
    values (v_user_id, p_component_slug, 'signup_bonus');

    return query select true, true, 'signup_bonus'::public.component_grant_type,
      greatest(0, 3 - v_signup_used), greatest(0, 4 - v_monthly_used), v_next_month;
    return;
  end if;

  select profiles.monthly_eligible_from into v_monthly_eligible_from
  from public.profiles
  where user_id = v_user_id;

  if current_date >= v_monthly_eligible_from and v_monthly_used < 4 then
    insert into public.component_unlocks (
      user_id,
      component_slug,
      grant_type,
      period_start
    ) values (
      v_user_id,
      p_component_slug,
      'monthly',
      v_month_start
    );

    return query select true, true, 'monthly'::public.component_grant_type,
      0, greatest(0, 3 - v_monthly_used), v_next_month;
    return;
  end if;

  return query select false, false, null::public.component_grant_type,
    0, greatest(0, 4 - v_monthly_used), v_next_month;
end;
$$;

create function public.claim_anonymous_component_access(
  p_identity_hash text,
  p_component_slug text
)
returns table (
  allowed boolean,
  newly_unlocked boolean,
  remaining integer
)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_used integer;
begin
  if p_identity_hash is null or p_identity_hash !~ '^[a-f0-9]{64}$' then
    raise exception using errcode = '22023', message = 'Invalid anonymous identity';
  end if;

  if p_component_slug is null
    or p_component_slug !~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'
    or length(p_component_slug) > 120 then
    raise exception using errcode = '22023', message = 'Invalid component slug';
  end if;

  perform pg_advisory_xact_lock(hashtextextended(p_identity_hash, 0));

  select count(*)::integer into v_used
  from public.anonymous_component_unlocks
  where identity_hash = p_identity_hash;

  if exists (
    select 1 from public.anonymous_component_unlocks
    where identity_hash = p_identity_hash and component_slug = p_component_slug
  ) then
    return query select true, false, greatest(0, 4 - v_used);
    return;
  end if;

  if v_used >= 4 then
    return query select false, false, 0;
    return;
  end if;

  insert into public.anonymous_component_unlocks (identity_hash, component_slug)
  values (p_identity_hash, p_component_slug);

  return query select true, true, greatest(0, 3 - v_used);
end;
$$;

revoke all on function public.claim_component_access(text) from public;
grant execute on function public.claim_component_access(text) to authenticated;

revoke all on function public.claim_anonymous_component_access(text, text) from public;
grant execute on function public.claim_anonymous_component_access(text, text) to service_role;

revoke all on function public.create_profile_for_new_user() from public;

commit;
