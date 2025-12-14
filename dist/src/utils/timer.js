export async function measure(label, fn) {
    const start = Date.now();
    const result = await fn();
    return { ...result, latencyMs: Date.now() - start };
}
