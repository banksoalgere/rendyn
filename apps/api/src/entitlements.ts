import type { AppConfig } from "./config.js";

export interface UserAccessGrant {
  allowed: boolean;
  newly_unlocked: boolean;
  plan_code: string;
  subscription_status: null;
  access_ends_at: null;
}

export class EntitlementService {
  constructor(private readonly config: AppConfig) {}

  // MCP callers verify the token and required scopes before requesting source.
  async claimUser(_token: string, _componentSlug: string): Promise<UserAccessGrant> {
    if (!this.config.supabaseConfigured) {
      throw new Error("MCP authentication is unavailable until Supabase is configured");
    }
    return {
      allowed: true,
      newly_unlocked: false,
      plan_code: "free",
      subscription_status: null,
      access_ends_at: null,
    };
  }
}
