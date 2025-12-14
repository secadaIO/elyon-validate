import type { ConsensusResult } from "./types.js";
import type { ConsensusConfig } from "./config.js";
import { DEFAULT_CONSENSUS_CONFIG } from "./config.js";
import { computePairwiseAgreements } from "./quorum";

export type ModelResult =
  | { model: string; ok: true; output: string }
  | { model: string; ok: false; error: string };

export function determineConsensus(
  results: ModelResult[],
  config: ConsensusConfig = DEFAULT_CONSENSUS_CONFIG
): ConsensusResult {
  const successes = results.filter(
    (r): r is Extract<ModelResult, { ok: true }> => r.ok
  );

  const failures = results.filter(
    (r): r is Extract<ModelResult, { ok: false }> => !r.ok
  );

  let decision: ConsensusResult["decision"] = "REVIEW";
  let agreements: string[] = [];
  let divergences: string[] = [];
  let score = 0;

  if (successes.length < config.minSuccessfulModels) {
    divergences = ["Insufficient successful model responses for quorum"];
  } else {
    const pairwise = computePairwiseAgreements(successes);

    const strongAgreements = pairwise.filter(
  (p: { score: number }) => p.score >= config.acceptThreshold
);


    if (strongAgreements.length > 0) {
      decision = "ACCEPT";
      score = Math.max(...strongAgreements.map((p: { score: number }) => p.score));
      agreements = strongAgreements.flatMap(
  (p: { models: [string, string] }) => p.models
);


    } else {
      divergences = ["No strong agreement detected between any model pair"];
    }
  }

  // ---- Step 3: Confidence bands (derived only) ----
  let confidence: ConsensusResult["confidence"] = "LOW";

  if (decision === "ACCEPT" && failures.length === 0 && divergences.length === 0) {
    confidence = "HIGH";
  } else if (
    decision === "ACCEPT" ||
    (decision === "REVIEW" && agreements.length > 0)
  ) {
    confidence = "MEDIUM";
  }

  return {
    decision,
    confidence,
    score,
    rationale:
      decision === "ACCEPT"
        ? "Strong agreement detected between model pairs"
        : "Review recommended due to insufficient or divergent agreement",
    agreements,
    divergences,
    failures: failures.map(f => f.model)
  };
}
