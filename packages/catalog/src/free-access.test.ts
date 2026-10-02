import { describe, expect, it } from 'vitest';
import { FREE_ACCESS_STARTS_AT, FREE_ACCESS_ENDS_AT, isFreeAccessActive } from './free-access';

describe('free-access campaign boundaries', () => {
  it('opens at the start and closes exactly at the end', () => {
    const start = Date.parse(FREE_ACCESS_STARTS_AT);
    const end = Date.parse(FREE_ACCESS_ENDS_AT);
    expect(isFreeAccessActive(start - 1)).toBe(false);
    expect(isFreeAccessActive(start)).toBe(true);
    expect(isFreeAccessActive(end - 1)).toBe(true);
    expect(isFreeAccessActive(end)).toBe(false);
  });
  it.each([NaN, Infinity, -Infinity])('fails closed for an invalid clock %s', now => {
    expect(isFreeAccessActive(now)).toBe(false);
  });
});
