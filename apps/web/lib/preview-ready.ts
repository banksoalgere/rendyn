export const PREVIEW_READY = 'rendyn:preview-ready';
export const PREVIEW_READY_REQUEST = 'rendyn:preview-ready-request';

export function isPreviewReadyMessage(
  event: Pick<MessageEvent<unknown>, 'data' | 'origin' | 'source'>,
  previewWindow: Window | null | undefined,
  origin: string,
): boolean {
  return isPreviewMessage(event, previewWindow, origin, PREVIEW_READY);
}

export function isPreviewReadyRequest(
  event: Pick<MessageEvent<unknown>, 'data' | 'origin' | 'source'>,
  parentWindow: Window | null | undefined,
  origin: string,
): boolean {
  return isPreviewMessage(event, parentWindow, origin, PREVIEW_READY_REQUEST);
}

function isPreviewMessage(
  event: Pick<MessageEvent<unknown>, 'data' | 'origin' | 'source'>,
  previewWindow: Window | null | undefined,
  origin: string,
  type: string,
): boolean {
  return Boolean(previewWindow)
    && event.source === previewWindow
    && event.origin === origin
    && typeof event.data === 'object'
    && event.data !== null
    && 'type' in event.data
    && event.data.type === type;
}
