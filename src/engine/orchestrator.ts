
import { ValidationRequest } from "../types";
import { getAdapter } from "../adapters/index";
import { runConcurrent } from "./concurrency";
import { scoreValidation } from "../validator/score";
import { compareResults } from "../validator/compare";
import { buildConsensus } from "../validator/consensus";
import { generateReport } from "../output/report";
import { Timer } from "../utils/timer";
import type { ValidationRequest } from "../types";
import { getAdapter } from "../adapters/index.js";
import { runConcurrent } from "./concurrency.js";

export async function orchestrate(req: ValidationRequest) {
  const calls = req.models.map(model => {
    const adapter = getAdapter(model);
    return async () => {
      try {
        const output = await adapter.invoke(req.content);
        return { model: adapter.name, output, ok: true };
      } catch (err) {
        return {
          model: adapter.name,
          ok: false,
          error: err instanceof Error ? err.message : String(err)
        };
      }
    };
  });


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
