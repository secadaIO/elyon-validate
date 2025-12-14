import type { ConsensusResult } from "./types";
import type { ConsensusConfig } from "./config";
import { DEFAULT_CONSENSUS_CONFIG } from "./config";
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

  if (successes.length < config.minSuccessfulModels) {
    return {
      decision: "REVIEW",
      score: 0,
      rationale: "Insufficient successful model responses for quorum",
      agreements: [],
      divergences: [],
      failures: failures.map(f => f.model)
    };
  }

  const pairwise = computePairwiseAgreements(successes);

  const strongAgreements = pairwise.filter(
    p => p.score >= config.acceptThreshold
  );

  const decision: ConsensusResult["decision"] =
    strongAgreements.length > 0 ? "ACCEPT" : "REVIEW";

  const score =
    strongAgreements.length > 0
      ? Math.max(...strongAgreements.map(p => p.score))
      : 0;

  return {
    decision,
    score,
    rationale:
      decision === "ACCEPT"
        ? "Strong agreement detected between model pairs"
        : "No strong agreement detected; review recommended",
    agreements: strongAgreements.flatMap(p => p.models),
    divergences:
      decision === "REVIEW"
        ? ["No strong agreement between any model pair"]
        : [],
    failures: failures.map(f => f.model)
  };
}