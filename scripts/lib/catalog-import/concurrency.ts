export async function mapConcurrent<T, R>(
  input: T[],
  concurrency: number,
  worker: (value: T, index: number) => Promise<R>,
): Promise<R[]> {
  const results = new Array<R>(input.length);
  let nextIndex = 0;
  const workerCount = Math.min(Math.max(1, concurrency), input.length);

  await Promise.all(
    Array.from({ length: workerCount }, async () => {
      while (nextIndex < input.length) {
        const currentIndex = nextIndex;
        nextIndex += 1;
        results[currentIndex] = await worker(input[currentIndex], currentIndex);
      }
    }),
  );
  return results;
}
