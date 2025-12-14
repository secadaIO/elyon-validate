export type ConsensusDecision = "ACCEPT" | "REJECT" | "REVIEW";

export interface ConsensusResult {
  decision: ConsensusDecision;
  score: number;
  rationale: string;
  agreements: string[];
  divergences: string[];
  failures: string[];
}
