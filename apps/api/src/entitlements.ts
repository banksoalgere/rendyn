import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { AppConfig } from "./config.js";

const userAccessGrantSchema = z.object({
  allowed: z.boolean(),
  newly_unlocked: z.boolean(),
  plan_code: z.string().nullable(),
  subscription_status: z.enum([
    "trialing",
    "active",
    "past_due",
    "canceled",
    "incomplete",
    "unpaid",
  ]).nullable(),
  access_ends_at: z.string().nullable(),
}).strict();

const subscriptionAccessSchema = z.object({
  allowed: z.boolean(),
  plan_code: z.string().nullable(),
  subscription_status: z.enum([
    "trialing",
    "active",
    "past_due",
    "canceled",
    "incomplete",
    "unpaid",
  ]).nullable(),
  trial_end: z.string().nullable(),
  current_period_end: z.string().nullable(),
  cancel_at_period_end: z.boolean(),
}).strict();

export type UserAccessGrant = z.infer<typeof userAccessGrantSchema>;
export type SubscriptionAccess = z.infer<typeof subscriptionAccessSchema>;

function firstRow(value: unknown): unknown {
  return Array.isArray(value) ? value[0] : value;
}

export class EntitlementService {
  constructor(private readonly config: AppConfig) {}

  private requireConfigured(): void {
    if (!this.config.supabaseConfigured) {
      throw new Error("Entitlements are unavailable until Supabase is configured");
    }
  }

  private userClient(token: string) {
    this.requireConfigured();
    return createClient(this.config.SUPABASE_URL!, this.config.SUPABASE_ANON_KEY!, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { headers: { Authorization: `Bearer ${token}` } },
    });
  }

  async subscriptionAccess(token: string): Promise<SubscriptionAccess> {
    const { data, error } = await this.userClient(token).rpc("get_subscription_access");
    if (error) throw new Error(`Subscription access check failed: ${error.code}`);
    const parsed = subscriptionAccessSchema.safeParse(firstRow(data));
    if (!parsed.success) throw new Error("Malformed subscription access response");
    return parsed.data;
  }

  async claimUser(token: string, componentSlug: string): Promise<UserAccessGrant> {
    const { data, error } = await this.userClient(token).rpc("claim_component_access", {
      p_component_slug: componentSlug,
    });
    if (error) throw new Error(`Entitlement claim failed: ${error.code}`);
    const parsed = userAccessGrantSchema.safeParse(firstRow(data));
    if (!parsed.success) throw new Error("Malformed entitlement response");
    return parsed.data;
  }
}
