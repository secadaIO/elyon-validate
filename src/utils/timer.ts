export async function measure<T>(
  label: string,
  fn: () => Promise<T>
): Promise<T & { latencyMs: number }> {
  const start = Date.now();
  const result = await fn();
  return { ...result, latencyMs: Date.now() - start };
}
