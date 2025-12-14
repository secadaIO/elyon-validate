export type ConsensusDecision = "ACCEPT" | "REJECT" | "REVIEW";

export interface ConsensusResult {
  decision: ConsensusDecision;
  score: number;              // 0.0 – 1.0
  rationale: string;
  agreements: string[];
  divergences: string[];
  failures: string[];
}

