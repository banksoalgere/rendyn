import { randomBytes } from "node:crypto";
import type {
  OAuthClientInformationMixed,
  OAuthClientMetadata,
  OAuthClientProvider,
  OAuthDiscoveryState,
  OAuthTokens,
} from "@modelcontextprotocol/client";

export class ProductionOAuthProvider implements OAuthClientProvider {
  private client: OAuthClientInformationMixed | undefined;
  private storedTokens: OAuthTokens | undefined;
  private verifier: string | undefined;
  private discovery: OAuthDiscoveryState | undefined;
  private readonly expectedState = randomBytes(32).toString("base64url");
  authorizationUrl: URL | undefined;

  constructor(readonly redirectUrl: URL) {}

  get clientMetadata(): OAuthClientMetadata {
    return {
      client_name: "DesignMCP production verifier",
      redirect_uris: [this.redirectUrl.toString()],
      grant_types: ["authorization_code", "refresh_token"],
      response_types: ["code"],
      application_type: "native",
      token_endpoint_auth_method: "none",
    };
  }

  state(): string {
    return this.expectedState;
  }

  assertState(value: string | null): void {
    if (value !== this.expectedState) throw new Error("OAuth callback state did not match");
  }

  clientInformation(): OAuthClientInformationMixed | undefined {
    return this.client;
  }

  saveClientInformation(client: OAuthClientInformationMixed): void {
    this.client = client;
  }

  tokens(): OAuthTokens | undefined {
    return this.storedTokens;
  }

  saveTokens(tokens: OAuthTokens): void {
    this.storedTokens = tokens;
  }

  redirectToAuthorization(url: URL): void {
    if (url.protocol !== "https:") throw new Error("Refusing a non-HTTPS authorization URL");
    this.authorizationUrl = url;
    process.stdout.write(`AUTHORIZATION_URL=${url.toString()}\n`);
  }

  saveCodeVerifier(codeVerifier: string): void {
    this.verifier = codeVerifier;
  }

  codeVerifier(): string {
    if (!this.verifier) throw new Error("OAuth PKCE verifier is unavailable");
    return this.verifier;
  }

  saveDiscoveryState(state: OAuthDiscoveryState): void {
    this.discovery = state;
  }

  discoveryState(): OAuthDiscoveryState | undefined {
    return this.discovery;
  }

  invalidateCredentials(scope: "all" | "client" | "tokens" | "verifier" | "discovery"): void {
    if (scope === "all" || scope === "client") this.client = undefined;
    if (scope === "all" || scope === "tokens") this.storedTokens = undefined;
    if (scope === "all" || scope === "verifier") this.verifier = undefined;
    if (scope === "all" || scope === "discovery") this.discovery = undefined;
  }

  get dynamicallyRegistered(): boolean {
    return Boolean(this.client);
  }

  get authenticated(): boolean {
    return Boolean(this.storedTokens?.access_token);
  }
}
