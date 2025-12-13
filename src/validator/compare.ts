export function findConflicts(a: string, b: string): string[] {
  if (a === b) return [];
  return ["Semantic divergence detected"];
}
