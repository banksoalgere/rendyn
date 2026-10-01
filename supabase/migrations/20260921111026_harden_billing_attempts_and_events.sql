begin;

-- Server-only durable state. No browser role can read or mutate billing leases.
create table public.billing_checkout_attempts (
  user_id uuid primary key references auth.users(id) on delete cascade,
  attempt_id uuid,
  parameters jsonb,
  session_id text,
  lease_token uuid,
  lease_until timestamptz
);
create table public.stripe_webhook_leases (
  subscription_id text primary key,
  lease_token uuid,
  lease_until timestamptz
);
create table public.stripe_webhook_events (
  event_id text primary key,
  subscription_id text not null,
  processed_at timestamptz not null default now()
);
alter table public.billing_checkout_attempts enable row level security;
alter table public.stripe_webhook_leases enable row level security;
alter table public.stripe_webhook_events enable row level security;
revoke all on public.billing_checkout_attempts, public.stripe_webhook_leases,
  public.stripe_webhook_events from public, anon, authenticated;

create function public.claim_checkout_attempt(p_user_id uuid, p_lease_token uuid)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare v_attempt public.billing_checkout_attempts;
begin
  if p_user_id is null or p_lease_token is null then
    raise exception 'Invalid checkout lease';
  end if;
  insert into public.billing_checkout_attempts(user_id) values(p_user_id)
    on conflict do nothing;
  select * into v_attempt from public.billing_checkout_attempts
    where user_id = p_user_id for update;
  if exists(select 1 from public.subscriptions where user_id = p_user_id and provider = 'stripe') then
    return jsonb_build_object('status', 'trial_used');
  end if;
  if v_attempt.lease_until > clock_timestamp() then
    return jsonb_build_object('status', 'busy');
  end if;
  update public.billing_checkout_attempts set lease_token = p_lease_token,
    lease_until = clock_timestamp() + interval '5 minutes' where user_id = p_user_id;
  return jsonb_build_object('status', 'claimed', 'attemptId', v_attempt.attempt_id,
    'parameters', v_attempt.parameters, 'sessionId', v_attempt.session_id);
end;
$$;

create function public.save_checkout_attempt(p_user_id uuid, p_lease_token uuid,
  p_attempt_id uuid, p_parameters jsonb, p_session_id text)
returns void language plpgsql security definer set search_path = '' as $$
begin
  if p_attempt_id is null or p_parameters is null or jsonb_typeof(p_parameters) <> 'object'
    or octet_length(p_parameters::text) > 16384
    or (p_session_id is not null and (length(p_session_id) > 255 or p_session_id !~ '^cs_')) then
    raise exception 'Invalid checkout attempt';
  end if;
  update public.billing_checkout_attempts set attempt_id = p_attempt_id,
    parameters = p_parameters, session_id = p_session_id
    where user_id = p_user_id and lease_token = p_lease_token and lease_until > clock_timestamp();
  if not found then raise exception 'Checkout lease lost'; end if;
end;
$$;

create function public.release_checkout_attempt(p_user_id uuid, p_lease_token uuid)
returns void language sql security definer set search_path = '' as $$
  update public.billing_checkout_attempts set lease_token = null, lease_until = null
    where user_id = p_user_id and lease_token = p_lease_token;
$$;

create function public.claim_stripe_event(p_event_id text, p_subscription_id text, p_lease_token uuid)
returns text language plpgsql security definer set search_path = '' as $$
declare v_until timestamptz;
begin
  if p_event_id is null or p_event_id !~ '^evt_[A-Za-z0-9_]+$' or length(p_event_id) > 255
    or p_subscription_id is null or p_subscription_id !~ '^sub_[A-Za-z0-9_]+$'
    or length(p_subscription_id) > 255 or p_lease_token is null then
    raise exception 'Invalid Stripe event';
  end if;
  if exists(select 1 from public.stripe_webhook_events where event_id = p_event_id) then
    return 'processed';
  end if;
  insert into public.stripe_webhook_leases(subscription_id) values(p_subscription_id)
    on conflict do nothing;
  select lease_until into v_until from public.stripe_webhook_leases
    where subscription_id = p_subscription_id for update;
  if v_until > clock_timestamp() then return 'busy'; end if;
  -- Recheck after acquiring the row lock: another transaction may have committed.
  if exists(select 1 from public.stripe_webhook_events where event_id = p_event_id) then
    return 'processed';
  end if;
  update public.stripe_webhook_leases set lease_token = p_lease_token,
    lease_until = clock_timestamp() + interval '5 minutes' where subscription_id = p_subscription_id;
  return 'claimed';
end;
$$;

create function public.release_stripe_event(p_subscription_id text, p_lease_token uuid)
returns void language sql security definer set search_path = '' as $$
  update public.stripe_webhook_leases set lease_token = null, lease_until = null
    where subscription_id = p_subscription_id and lease_token = p_lease_token;
$$;

create function public.apply_stripe_event(
  p_event_id text, p_lease_token uuid, p_user_id uuid, p_provider_customer_id text,
  p_provider_subscription_id text, p_plan_code text, p_status public.subscription_status,
  p_trial_end timestamptz, p_current_period_end timestamptz,
  p_cancel_at_period_end boolean, p_event_created_at timestamptz
)
returns void language plpgsql security definer set search_path = '' as $$
declare v_timestamp timestamptz;
begin
  perform 1 from public.stripe_webhook_leases
    where subscription_id = p_provider_subscription_id and lease_token = p_lease_token
      and lease_until > clock_timestamp() for update;
  if not found then raise exception 'Stripe event lease lost'; end if;
  if p_event_id is null or p_event_id !~ '^evt_[A-Za-z0-9_]+$' or length(p_event_id) > 255
    or p_event_created_at is null then raise exception 'Invalid Stripe event'; end if;
  if not exists(select 1 from public.stripe_webhook_events where event_id = p_event_id) then
    -- The handler retrieves current Stripe state AFTER taking this subscription's lease.
    -- Keep the provider timestamp monotonic without discarding a fresh reconciliation
    -- triggered by an old or same-second event. The lease fences expired handlers.
    select greatest(p_event_created_at, provider_event_created_at) into v_timestamp
      from public.subscriptions where provider = 'stripe'
        and provider_subscription_id = p_provider_subscription_id;
    perform public.sync_stripe_subscription(p_user_id, p_provider_customer_id,
      p_provider_subscription_id, p_plan_code, p_status, p_trial_end,
      p_current_period_end, p_cancel_at_period_end, coalesce(v_timestamp, p_event_created_at));
    insert into public.stripe_webhook_events(event_id, subscription_id)
      values(p_event_id, p_provider_subscription_id);
  end if;
  perform public.release_stripe_event(p_provider_subscription_id, p_lease_token);
end;
$$;

revoke all on function public.claim_checkout_attempt(uuid, uuid) from public, anon, authenticated;
revoke all on function public.save_checkout_attempt(uuid, uuid, uuid, jsonb, text) from public, anon, authenticated;
revoke all on function public.release_checkout_attempt(uuid, uuid) from public, anon, authenticated;
revoke all on function public.claim_stripe_event(text, text, uuid) from public, anon, authenticated;
revoke all on function public.release_stripe_event(text, uuid) from public, anon, authenticated;
revoke all on function public.apply_stripe_event(text, uuid, uuid, text, text, text,
  public.subscription_status, timestamptz, timestamptz, boolean, timestamptz) from public, anon, authenticated;
grant execute on function public.claim_checkout_attempt(uuid, uuid) to service_role;
grant execute on function public.save_checkout_attempt(uuid, uuid, uuid, jsonb, text) to service_role;
grant execute on function public.release_checkout_attempt(uuid, uuid) to service_role;
grant execute on function public.claim_stripe_event(text, text, uuid) to service_role;
grant execute on function public.release_stripe_event(text, uuid) to service_role;
grant execute on function public.apply_stripe_event(text, uuid, uuid, text, text, text,
  public.subscription_status, timestamptz, timestamptz, boolean, timestamptz) to service_role;

-- Supabase default ACLs may grant these roles directly, independently of PUBLIC.
revoke all on function public.sync_stripe_subscription(uuid, text, text, text,
  public.subscription_status, timestamptz, timestamptz, boolean, timestamptz)
  from public, anon, authenticated;
comment on column public.subscriptions.provider_event_created_at is
  'Latest provider event timestamp observed; current Stripe state is reconciled under a subscription lease.';

commit;
