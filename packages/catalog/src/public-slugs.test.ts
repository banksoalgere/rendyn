import { describe, expect, it } from 'vitest';
import { assignPublicSlugs } from './public-slugs.js';

describe('published component URLs', () => {
  it('retains URLs through renames and reserves retired paths', () => {
    const original = assignPublicSlugs([{ id: 'test:one', name: 'Email Input' }, { id: 'test:two', name: 'Email Input' }]);
    const next = assignPublicSlugs([{ id: 'test:one', name: 'Required Text Field' }, { id: 'test:three', name: 'Email Input' }], original);
    expect(next).toEqual({ 'test:one': 'email-input', 'test:two': 'email-input-example-2', 'test:three': 'email-input-example-3' });
  });
  it('rejects unsafe, duplicate and malformed published paths', () => {
    expect(() => assignPublicSlugs([], { 'test:one': '../private' })).toThrow();
    expect(() => assignPublicSlugs([], { 'test:one': 'same', 'test:two': 'same' })).toThrow();
    expect(() => assignPublicSlugs([], { 'bad/id': 'safe' })).toThrow();
  });
});
