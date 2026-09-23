export class BodyTooLargeError extends Error {
  constructor() { super('Payload exceeds the allowed size'); }
}

/** Preserve exact bytes for signatures and hashes; never buffer beyond the limit. */
export async function readBoundedBody(
  message: Pick<Response, 'body' | 'headers'>,
  maximumBytes: number,
): Promise<Uint8Array> {
  const length = message.headers.get('content-length');
  if (length !== null && (!/^\d+$/.test(length) || Number(length) > maximumBytes)) {
    await message.body?.cancel();
    throw new BodyTooLargeError();
  }
  if (!message.body) return new Uint8Array();
  const reader = message.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maximumBytes) {
        await reader.cancel();
        throw new BodyTooLargeError();
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const result = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { result.set(chunk, offset); offset += chunk.byteLength; }
  return result;
}
