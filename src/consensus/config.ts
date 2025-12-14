export interface ConsensusConfig {
  acceptThreshold: number;
  rejectThreshold: number;
  minSuccessfulModels: number;
}

export const DEFAULT_CONSENSUS_CONFIG: ConsensusConfig = {
  acceptThreshold: 0.9,
  rejectThreshold: 0.6,
  minSuccessfulModels: 2
};
