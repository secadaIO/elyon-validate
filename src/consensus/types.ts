export type ConsensusDecision = "ACCEPT" | "REJECT" | "REVIEW";
export type ConfidenceBand = "HIGH" | "MEDIUM" | "LOW";


export interface ConsensusResult {
  decision: ConsensusDecision;
  score: number;              // 0.0 – 1.0
  rationale: string;
  agreements: string[];
  divergences: string[];
  failures: string[];
  confidence: ConfidenceBand;   // ← new

}

