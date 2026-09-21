import { describe, expect, it } from 'vitest';
import { isPreviewReadyMessage, isPreviewReadyRequest, PREVIEW_READY, PREVIEW_READY_REQUEST } from './preview-ready';

const origin = 'https://rendyn.dev';
const previewWindow = {} as Window;
const ready = { source: previewWindow, origin, data: { type: PREVIEW_READY } };

describe('preview readiness', () => {
  it('accepts readiness replays only from the same-origin parent', () => {
    const request = { ...ready, data: { type: PREVIEW_READY_REQUEST } };
    expect(isPreviewReadyRequest(request, previewWindow, origin)).toBe(true);
    expect(isPreviewReadyRequest(request, {} as Window, origin)).toBe(false);
    expect(isPreviewReadyRequest({ ...request, origin: 'https://elsewhere.test' }, previewWindow, origin)).toBe(false);
    expect(isPreviewReadyRequest(ready, previewWindow, origin)).toBe(false);
    expect(isPreviewReadyRequest({ ...request, data: null }, previewWindow, origin)).toBe(false);
  });

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
