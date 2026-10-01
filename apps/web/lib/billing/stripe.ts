import Stripe from 'stripe';
import { getBillingConfig } from './config';

let stripeClient: Stripe | undefined;
let cryptoProvider: ReturnType<typeof Stripe.createSubtleCryptoProvider> | undefined;

export function getStripe(): Stripe {
  if (!stripeClient) {
    stripeClient = new Stripe(getBillingConfig().stripeSecretKey, {
      httpClient: Stripe.createFetchHttpClient(),
      maxNetworkRetries: 1,
      timeout: 20_000,
    });
  }
  return stripeClient;
}

export function getStripeCryptoProvider() {
  cryptoProvider ??= Stripe.createSubtleCryptoProvider();
  return cryptoProvider;
}
