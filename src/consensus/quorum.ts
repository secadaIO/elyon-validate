import { agreementScore } from "./score";

export interface PairwiseAgreement {
  models: [string, string];
  score: number;
}

export function computePairwiseAgreements(
  successes: Array<{ model: string; output: string }>
): PairwiseAgreement[] {
  const pairs: PairwiseAgreement[] = [];

  for (let i = 0; i < successes.length; i++) {
    for (let j = i + 1; j < successes.length; j++) {
      const a = successes[i];
      const b = successes[j];

      pairs.push({
        models: [a.model, b.model],
        score: agreementScore(a.output, b.output)
      });
    }
  }

  return pairs;
}
