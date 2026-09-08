import { describe, expect, it, vi } from 'vitest';
import { requestEmailCode, verifyEmailCode } from './email-code';

function provider() {
  return {
    signInWithOtp: vi.fn().mockResolvedValue({ data: {}, error: null }),
    verifyOtp: vi.fn().mockResolvedValue({ data: { session: { access_token: 'test' } }, error: null }),
  };
}

describe('email code authentication', () => {
  it('requests a code for the normalized address without an email-link redirect', async () => {
    const auth = provider();
    await expect(requestEmailCode(auth, ' person@example.com ')).resolves.toBe('person@example.com');
    expect(auth.signInWithOtp).toHaveBeenCalledWith({ email: 'person@example.com' });
  });
  it.each(['', 'not-an-email', 'a@b@c.com', `${'a'.repeat(250)}@example.com`])('rejects invalid email before calling the provider: %s', async (email) => {
    const auth = provider();
    await expect(requestEmailCode(auth, email)).rejects.toThrow('valid email');
    expect(auth.signInWithOtp).not.toHaveBeenCalled();
  });
  it('reports delivery rejection without revealing account details', async () => {
    const auth = provider();
    auth.signInWithOtp.mockResolvedValue({ error: { message: 'internal account details' } });
    await expect(requestEmailCode(auth, 'person@example.com')).rejects.toThrow('We couldn’t send a code');
  });
  it('verifies the code for the same email and requires an authenticated session', async () => {
    const auth = provider();
    await expect(verifyEmailCode(auth, 'person@example.com', '123456')).resolves.toBeUndefined();
    expect(auth.verifyOtp).toHaveBeenCalledWith({ email: 'person@example.com', token: '123456', type: 'email' });
  });
  it.each(['12345', '1234567', '12345a', ' 123456'])('rejects malformed codes: %s', async (code) => {
    const auth = provider();
    await expect(verifyEmailCode(auth, 'person@example.com', code)).rejects.toThrow('six-digit');
    expect(auth.verifyOtp).not.toHaveBeenCalled();
  });
  it.each([
    { data: { session: null }, error: null },
    { data: { session: null }, error: { message: 'expired' } },
  ])('does not accept a missing session or rejected code', async (result) => {
    const auth = provider();
    auth.verifyOtp.mockResolvedValue(result);
    await expect(verifyEmailCode(auth, 'person@example.com', '123456')).rejects.toThrow('invalid or has expired');
  });
});
