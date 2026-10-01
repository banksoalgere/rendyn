import { readFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { PGlite } from '@electric-sql/pglite';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

const user = '11111111-1111-4111-8111-111111111111';
const lease = '22222222-2222-4222-8222-222222222222';
const other = '33333333-3333-4333-8333-333333333333';
let db: PGlite;
beforeAll(async () => {
  db = new PGlite();
  await db.exec(`create role anon; create role authenticated; create role service_role;
    create schema auth; create table auth.users(id uuid primary key, created_at timestamptz default now());
    create function auth.uid() returns uuid language sql as 'select null::uuid';
    alter default privileges in schema public grant execute on functions to anon, authenticated;`);
  const root = resolve(import.meta.dirname, '../supabase/migrations');
  for (const name of (await readdir(root)).filter(name => name.endsWith('.sql')).sort()) await db.exec(await readFile(resolve(root, name), 'utf8'));
  await db.query('insert into auth.users(id) values($1)', [user]);
}, 30_000);
afterAll(async () => { await db?.close(); });

async function claim(event: string, token = lease) {
  return (await db.query<{ result: string }>('select public.claim_stripe_event($1,$2,$3) as result', [event, 'sub_test', token])).rows[0].result;
}
async function apply(event: string, status: string, created: string, token = lease) {
  await db.query(`select public.apply_stripe_event($1,$2,$3,'cus_test','sub_test','pro_monthly',
    $4::public.subscription_status,null,now()+interval '1 month',false,$5::timestamptz)`, [event, token, user, status, created]);
}

describe('billing migrations in PostgreSQL', () => {
  it('serialises checkout creation and fences stale lease holders', async () => {
    const first = await db.query<{ result: { status: string } }>('select claim_checkout_attempt($1,$2) as result', [user, lease]);
    expect(first.rows[0].result.status).toBe('claimed');
    const busy = await db.query<{ result: { status: string } }>('select claim_checkout_attempt($1,$2) as result', [user, other]);
    expect(busy.rows[0].result.status).toBe('busy');
    await expect(db.query(`select save_checkout_attempt($1,$2,$3,'{}'::jsonb,null)`, [user, other, lease])).rejects.toThrow('lease lost');
    await db.query('select release_checkout_attempt($1,$2)', [user, lease]);
  });
  it('atomically deduplicates events and accepts current reconciliation for old/same-second events', async () => {
    expect(await claim('evt_first')).toBe('claimed');
    expect(await claim('evt_parallel', other)).toBe('busy');
    await apply('evt_first', 'active', '2026-09-21T12:00:00Z');
    expect(await claim('evt_first')).toBe('processed');
    expect(await claim('evt_same_second')).toBe('claimed');
    await apply('evt_same_second', 'past_due', '2026-09-21T12:00:00Z');
    expect(await claim('evt_old')).toBe('claimed');
    // The handler fetched current (canceled) provider state, not the old event's snapshot.
    await apply('evt_old', 'canceled', '2026-09-21T11:00:00Z');
    const result = (await db.query<{ status: string; count: number }>(`select status,
      (select count(*)::int from stripe_webhook_events) as count from subscriptions`)).rows[0];
    expect(result).toEqual({ status: 'canceled', count: 3 });
  });
  it('rejects a commit after a subscription lease expires', async () => {
    expect(await claim('evt_expired')).toBe('claimed');
    await db.exec("update stripe_webhook_leases set lease_until = now() - interval '1 second'");
    await expect(apply('evt_expired', 'active', '2026-09-21T12:00:00Z')).rejects.toThrow('lease lost');
    expect((await db.query('select * from stripe_webhook_events where event_id = $1', ['evt_expired'])).rows).toHaveLength(0);
  });
  it('prevents subsequent checkout attempts for an existing subscription', async () => {
    const result = await db.query<{ result: { status: string } }>('select claim_checkout_attempt($1,$2) as result', [user, lease]);
    expect(result.rows[0].result.status).toBe('trial_used');
  });
  it.each(['anon', 'authenticated'])('does not expose billing state or RPCs to %s', async role => {
    await db.exec(`set role ${role}`);
    try {
      await expect(db.query('select * from billing_checkout_attempts')).rejects.toThrow('permission denied');
      await expect(db.query('select claim_checkout_attempt($1,$2)', [user, lease])).rejects.toThrow('permission denied');
      await expect(db.query('select claim_stripe_event($1,$2,$3)', ['evt_forbidden', 'sub_test', lease])).rejects.toThrow('permission denied');
      await expect(db.query("select sync_stripe_subscription($1,'cus_bad','sub_bad','pro_monthly','active',null,null,false,now())", [user])).rejects.toThrow('permission denied');
    } finally { await db.exec('reset role'); }
  });
});
