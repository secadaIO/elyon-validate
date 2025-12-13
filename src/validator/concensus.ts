import { ValidationResult } from "../types.js";

export function determineConsensus(score: number): ValidationResult["consensus"] {
  if (score > 0.9) return "ACCEPT";
  if (score > 0.7) return "REVIEW_REQUIRED";
  return "REJECT";
}
