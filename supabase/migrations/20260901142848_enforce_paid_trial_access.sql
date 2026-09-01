begin;

alter table public.subscriptions
  add column trial_end timestamptz,
  add column provider_event_created_at timestamptz not null default to_timestamp(0);

comment on column public.subscriptions.trial_end is
  'End of the card-backed seven-day trial. Trial access is valid only while this timestamp is in the future.';

comment on column public.subscriptions.provider_event_created_at is
  'Creation time of the latest accepted provider event, used to ignore out-of-order webhook delivery.';

drop function if exists public.claim_component_access(text);
drop function if exists public.claim_anonymous_component_access(text, text);
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.create_profile_for_new_user();

revoke all on table public.anonymous_component_unlocks from anon, authenticated;

create function public.get_subscription_access()
returns table (
  allowed boolean,
  plan_code text,
  subscription_status public.subscription_status,
  trial_end timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean
)
language plpgsql
stable
security invoker
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
  v_subscription public.subscriptions%rowtype;
begin
  if v_user_id is null then
    raise exception using errcode = '42501', message = 'Authentication required';
  end if;

  select subscriptions.* into v_subscription
  from public.subscriptions
  where subscriptions.user_id = v_user_id
  order by
    case
      when subscriptions.status = 'trialing'
        and subscriptions.trial_end > now() then 0
      when subscriptions.status = 'active'
        and subscriptions.current_period_end > now() then 0
      else 1
    end,
    subscriptions.provider_event_created_at desc,
    subscriptions.updated_at desc
  limit 1;

  if not found then
    return query select
      false,
      null::text,
      null::public.subscription_status,
      null::timestamptz,
      null::timestamptz,
      false;
    return;
  end if;

  return query select
    (
      (v_subscription.status = 'trialing' and v_subscription.trial_end > now())
      or
      (v_subscription.status = 'active' and v_subscription.current_period_end > now())
    ),
    v_subscription.plan_code,
    v_subscription.status,
    v_subscription.trial_end,
    v_subscription.current_period_end,
    v_subscription.cancel_at_period_end;
end;
$$;

create function public.claim_component_access(p_component_slug text)
returns table (
  allowed boolean,
  newly_unlocked boolean,
  plan_code text,
  subscription_status public.subscription_status,
  access_ends_at timestamptz
)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
  v_access record;
  v_newly_unlocked boolean := false;
  v_inserted_rows integer := 0;
begin
  if v_user_id is null then
    raise exception using errcode = '42501', message = 'Authentication required';
  end if;

  if p_component_slug is null
    or p_component_slug !~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'
    or length(p_component_slug) > 120 then
    raise exception using errcode = '22023', message = 'Invalid component slug';
  end if;

  select * into v_access from public.get_subscription_access();

  if not coalesce(v_access.allowed, false) then
    return query select
      false,
      false,
      v_access.plan_code,
      v_access.subscription_status,
      case
        when v_access.subscription_status = 'trialing' then v_access.trial_end
        else v_access.current_period_end
      end;
    return;
  end if;

  insert into public.component_unlocks (user_id, component_slug, grant_type)
  values (v_user_id, p_component_slug, 'paid')
  on conflict (user_id, component_slug) do nothing;

  get diagnostics v_inserted_rows = row_count;
  v_newly_unlocked := v_inserted_rows = 1;

  return query select
    true,
    v_newly_unlocked,
    v_access.plan_code,
    v_access.subscription_status,
    case
      when v_access.subscription_status = 'trialing' then v_access.trial_end
      else v_access.current_period_end
    end;
end;
$$;

create function public.sync_stripe_subscription(
  p_user_id uuid,
  p_provider_customer_id text,
  p_provider_subscription_id text,
  p_plan_code text,
  p_status public.subscription_status,
  p_trial_end timestamptz,
  p_current_period_end timestamptz,
  p_cancel_at_period_end boolean,
  p_event_created_at timestamptz
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_existing_user_id uuid;
begin
  if p_provider_customer_id is null
    or length(p_provider_customer_id) not between 3 and 255
    or p_provider_subscription_id is null
    or length(p_provider_subscription_id) not between 3 and 255
    or p_plan_code is null
    or p_plan_code !~ '^[a-z0-9_-]{2,64}$'
    or p_event_created_at is null then
    raise exception using errcode = '22023', message = 'Invalid Stripe subscription payload';
  end if;

  select subscriptions.user_id into v_existing_user_id
  from public.subscriptions
  where subscriptions.provider = 'stripe'
    and subscriptions.provider_subscription_id = p_provider_subscription_id;

  if found and v_existing_user_id <> p_user_id then
    raise exception using errcode = '22023', message = 'Stripe subscription identity cannot be reassigned';
  end if;

  insert into public.subscriptions (
    user_id,
    provider,
    provider_customer_id,
    provider_subscription_id,
    plan_code,
    status,
    trial_end,
    current_period_end,
    cancel_at_period_end,
    provider_event_created_at,
    updated_at
  ) values (
    p_user_id,
    'stripe',
    p_provider_customer_id,
    p_provider_subscription_id,
    p_plan_code,
    p_status,
    p_trial_end,
    p_current_period_end,
    p_cancel_at_period_end,
    p_event_created_at,
    now()
  )
  on conflict (provider, provider_subscription_id) do update
  set
    user_id = excluded.user_id,
    provider_customer_id = excluded.provider_customer_id,
    plan_code = excluded.plan_code,
    status = excluded.status,
    trial_end = excluded.trial_end,
    current_period_end = excluded.current_period_end,
    cancel_at_period_end = excluded.cancel_at_period_end,
    provider_event_created_at = excluded.provider_event_created_at,
    updated_at = now()
  where public.subscriptions.provider_event_created_at <= excluded.provider_event_created_at;
end;
$$;

revoke all on function public.get_subscription_access() from public;
grant execute on function public.get_subscription_access() to authenticated;

revoke all on function public.claim_component_access(text) from public;
grant execute on function public.claim_component_access(text) to authenticated;

revoke all on function public.sync_stripe_subscription(
  uuid,
  text,
  text,
  text,
  public.subscription_status,
  timestamptz,
  timestamptz,
  boolean,
  timestamptz
) from public;
grant execute on function public.sync_stripe_subscription(
  uuid,
  text,
  text,
  text,
  public.subscription_status,
  timestamptz,
  timestamptz,
  boolean,
  timestamptz
) to service_role;

commit;
