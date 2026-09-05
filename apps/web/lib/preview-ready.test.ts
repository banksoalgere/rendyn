import { describe, expect, it } from 'vitest';
import { isPreviewReadyMessage, PREVIEW_READY } from './preview-ready';

const origin = 'https://rendyn.dev';
const previewWindow = {} as Window;
const ready = { source: previewWindow, origin, data: { type: PREVIEW_READY } };

describe('preview readiness', () => {
  it('accepts readiness only from the active embedded preview', () => {
    expect(isPreviewReadyMessage(ready, previewWindow, origin)).toBe(true);
    expect(isPreviewReadyMessage(ready, {} as Window, origin)).toBe(false);
    expect(isPreviewReadyMessage(ready, null, origin)).toBe(false);
    expect(isPreviewReadyMessage({ ...ready, origin: 'https://elsewhere.test' }, previewWindow, origin)).toBe(false);
  });

  it.each([null, undefined, 'ready', {}, { type: 'unrelated-event' }])('ignores unrelated or malformed payloads: %j', (data) => {
    expect(isPreviewReadyMessage({ ...ready, data }, previewWindow, origin)).toBe(false);
  });
});
