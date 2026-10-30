import { describe, expect, it } from 'vitest';
import { readSavedComponents } from './saved-components';

describe('saved-component storage validation', () => {
  it.each([null, 'broken JSON', '{}', '"button"', '[' + ' '.repeat(131072) + ']'])('handles corrupt storage without breaking the workspace', value => {
    expect(readSavedComponents(value)).toEqual([]);
  });
  it('only accepts bounded catalogue slugs and deduplicates them', () => {
    expect(readSavedComponents(JSON.stringify(['button', '../secret', '//attacker.example', '<script>', 1, null, 'button', 'animated-beam', 'a'.repeat(201)]))).toEqual(['button', 'animated-beam']);
  });
});
