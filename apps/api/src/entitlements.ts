import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { AppConfig } from "./config.js";

const userAccessGrantSchema = z.object({
  allowed: z.boolean(),
  newly_unlocked: z.boolean(),
  grant_type: z.enum(["signup_bonus", "monthly", "paid"]).nullable(),
  signup_bonus_remaining: z.number().int().nonnegative(),
  monthly_remaining: z.number().int().nonnegative(),
  monthly_reset_at: z.string().min(1),
}).strict();

const anonymousAccessGrantSchema = z.object({
  allowed: z.boolean(),
  newly_unlocked: z.boolean(),
  remaining: z.number().int().nonnegative(),
}).strict();

export type UserAccessGrant = z.infer<typeof userAccessGrantSchema>;
export type AnonymousAccessGrant = z.infer<typeof anonymousAccessGrantSchema>;

function firstRow(value: unknown): unknown {
  return Array.isArray(value) ? value[0] : value;
}

export class EntitlementService {
  private readonly serviceClient: SupabaseClient | null;

  constructor(private readonly config: AppConfig) {
    this.serviceClient = config.supabaseConfigured
      ? createClient(config.SUPABASE_URL!, config.SUPABASE_SERVICE_ROLE_KEY!, {
          auth: { persistSession: false, autoRefreshToken: false },
        })
      : null;
  }

  private requireConfigured(): void {
    if (!this.config.supabaseConfigured || !this.serviceClient) {
      throw new Error("Entitlements are unavailable until Supabase is configured");
    }
  }

  async claimUser(token: string, componentSlug: string): Promise<UserAccessGrant> {
    this.requireConfigured();
    const client = createClient(this.config.SUPABASE_URL!, this.config.SUPABASE_ANON_KEY!, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { headers: { Authorization: `Bearer ${token}` } },
    });
    const { data, error } = await client.rpc("claim_component_access", {
      p_component_slug: componentSlug,
    });
    if (error) throw new Error(`Entitlement claim failed: ${error.code}`);
    const parsed = userAccessGrantSchema.safeParse(firstRow(data));
    if (!parsed.success) throw new Error("Malformed entitlement response");
    return parsed.data;
  }

  async claimAnonymous(identityHash: string, componentSlug: string): Promise<AnonymousAccessGrant> {
    this.requireConfigured();
    const { data, error } = await this.serviceClient!.rpc("claim_anonymous_component_access", {
      p_identity_hash: identityHash,
      p_component_slug: componentSlug,
    });
    if (error) throw new Error(`Anonymous entitlement claim failed: ${error.code}`);
    const parsed = anonymousAccessGrantSchema.safeParse(firstRow(data));
    if (!parsed.success) throw new Error("Malformed entitlement response");
    return parsed.data;
  }
}
