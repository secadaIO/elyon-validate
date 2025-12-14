/**
 * v1: conservative divergence detector.
 * We deliberately avoid embeddings here; this is a governance-safe flag,
 * not a semantic guarantee.
 */
export function findDivergence(a: string, b: string): string[] {
  const aTrim = a.trim();
  const bTrim = b.trim();

  if (aTrim === bTrim) return [];

  // Very conservative signal for v1.
  return ["Semantic divergence detected"];
}
