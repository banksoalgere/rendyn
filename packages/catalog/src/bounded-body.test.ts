import { describe, expect, it, vi } from 'vitest';
import { BodyTooLargeError, readBoundedBody } from './bounded-body';

describe('bounded byte streams', () => {
  it('preserves exact bytes across chunks up to the limit', async () => {
    const body = new ReadableStream({ start(c) { c.enqueue(new Uint8Array([0, 255])); c.enqueue(new Uint8Array([13, 10])); c.close(); } });
    expect(await readBoundedBody(new Response(body), 4)).toEqual(new Uint8Array([0, 255, 13, 10]));
  });
  it('cancels an unknown-length stream immediately after exceeding the limit', async () => {
    const cancel = vi.fn(); let reads = 0;
    const body = new ReadableStream({ pull(c) { reads++; c.enqueue(new Uint8Array(3)); }, cancel }, { highWaterMark: 0 });
    await expect(readBoundedBody(new Response(body), 4)).rejects.toBeInstanceOf(BodyTooLargeError);
    expect(cancel).toHaveBeenCalledOnce(); expect(reads).toBe(2);
  });
  it.each(['-1', 'bad', '5'])('rejects invalid or excessive declared size %s', async length => {
    await expect(readBoundedBody(new Response('test', { headers: { 'Content-Length': length } }), 4)).rejects.toBeInstanceOf(BodyTooLargeError);
  });
  it('enforces the actual size even if a smaller header was provided', async () => {
    await expect(readBoundedBody(new Response('abcde', { headers: { 'Content-Length': '2' } }), 4)).rejects.toBeInstanceOf(BodyTooLargeError);
  });
});
