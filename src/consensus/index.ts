import { agreementScore } from "./score";
import { findDivergence } from "./compare";
import type { ConsensusResult } from "./types";

type ModelResult =
  | { model: string; ok: true; output: string }
  | { model: string; ok: false; error: string };

import { DEFAULT_CONSENSUS_CONFIG } from "./config";
import type { ConsensusConfig } from "./config";

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

  // If fewer than 2 successful responses, we can’t compare.
  if (successes.length < config.minSuccessfulModels) {
    return {
      decision: "REVIEW",
      score: 0,
      rationale: "Insufficient successful model responses for comparison",
      agreements: [],
      divergences: [],
      failures: failures.map(f => f.model)
    };
  }

  // v1: compare the first two successes (chatgpt vs grok).
  const a = successes[0];
  const b = successes[1];

  const score = agreementScore(a.output, b.output);
  const divergences = findDivergence(a.output, b.output);

  let decision: ConsensusResult["decision"] = "REVIEW";
  if (score >= config.acceptThreshold) {
  decision = "ACCEPT";
} else if (score < config.rejectThreshold) {
  decision = "REJECT";
}


  return {
    decision,
    score,
    rationale:
      decision === "ACCEPT"
        ? "Models strongly agree"
        : decision === "REJECT"
        ? "Models significantly diverge"
        : "Models partially align; human review recommended",
    agreements: score >= 0.9 ? [a.model, b.model] : [],
    divergences,
    failures: failures.map(f => f.model)
  };
}
