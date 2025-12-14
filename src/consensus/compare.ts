export function findDivergence(a: string, b: string): string[] {
  const aTrim = a.trim();
  const bTrim = b.trim();

  if (aTrim === bTrim) return [];

  return ["Semantic divergence detected"];
}
