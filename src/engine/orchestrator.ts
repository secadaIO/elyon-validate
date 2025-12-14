import { ValidationRequest } from "../types";
import { getAdapter } from "../adapters/index";
import { runConcurrent } from "./concurrency";
>>>>>>> 18a7eb1 (chore: stabilize CLI build, ESM runtime, and TypeScript configuration)

import { scoreValidation } from "../validator/score";
import { compareResults } from "../validator/compare";
import { buildConsensus } from "../validator/consensus";
import { generateReport } from "../output/report";
import { Timer } from "../utils/timer";

export interface ValidationInput {
  prompt: string;
}

export interface ValidationResult {
  score: number;
  notes: string;
}

export async function runOrchestrator(
  input: ValidationInput
): Promise<void> {
  const timer = new Timer();
  timer.start();

  const [gptResult, grokResult] = await Promise.all([
    scoreValidation("gpt", input.prompt),
    scoreValidation("grok", input.prompt),
  ]);

  const comparison = compareResults(gptResult, grokResult);
  const consensus = buildConsensus(comparison);

  generateReport({
    input,
    gptResult,
    grokResult,
    consensus,
    durationMs: timer.stop(),
  });
}
