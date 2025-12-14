export function agreementScore(a: string, b: string): number {
  if (a === b) return 1.0;

  const aTrim = a.trim();
  const bTrim = b.trim();

  if (aTrim.includes(bTrim) || bTrim.includes(aTrim)) {
    return 0.9;
  }

  return 0.5;
}
