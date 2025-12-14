import type { ConsensusDecision } from "./types";

export interface ConsensusConfig {
  acceptThreshold: number;      // e.g. ≥ 0.9
  rejectThreshold: number;      // e.g. < 0.6
  minSuccessfulModels: number;  // e.g. 2
}

/**
 * v1 defaults — MUST preserve existing behavior
 */
export const DEFAULT_CONSENSUS_CONFIG: ConsensusConfig = {
  acceptThreshold: 0.9,
  rejectThreshold: 0.6,
  minSuccessfulModels: 2
};
