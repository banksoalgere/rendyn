import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { getBillingConfig } from '../billing/config';
import { getSupabasePublicConfig } from './config';

let adminClient: SupabaseClient | undefined;

export function createAdminClient(): SupabaseClient {
  if (adminClient) return adminClient;

  const publicConfig = getSupabasePublicConfig();
  if (!publicConfig) throw new Error('Supabase is not configured');

  adminClient = createClient(
    publicConfig.url,
    getBillingConfig().supabaseServiceRoleKey,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
  return adminClient;
}
