export const PREVIEW_READY = 'rendyn:preview-ready';

export function isPreviewReadyMessage(
  event: Pick<MessageEvent<unknown>, 'data' | 'origin' | 'source'>,
  previewWindow: Window | null | undefined,
  origin: string,
): boolean {
  return Boolean(previewWindow)
    && event.source === previewWindow
    && event.origin === origin
    && typeof event.data === 'object'
    && event.data !== null
    && 'type' in event.data
    && event.data.type === PREVIEW_READY;
}
