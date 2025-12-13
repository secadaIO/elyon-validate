export type Mode = "public-public";

export interface ValidationRequest {
  content: string;
  mode: Mode;
  models: string[];
}

export interface ModelResponse {
  model: string;
  content: string;
  latencyMs: number;
}

export interface ValidationResult {
  agreementScore: number;
  conflicts: string[];
  consensus: "ACCEPT" | "REVIEW_REQUIRED" | "REJECT";
}
