import type { ValidationRequest } from "../types";
import { getAdapter } from "../adapters/index.js";
import { runConcurrent } from "./concurrency.js";
import { determineConsensus } from "../consensus/index.js";

export async function orchestrate(req: ValidationRequest) {
  const calls = req.models.map(model => {
    const adapter = getAdapter(model);
    return async (): Promise<
      | { model: string; ok: true; output: string }
      | { model: string; ok: false; error: string }
    > => {
      try {
        const output = await adapter.invoke(req.content);
        return { model: adapter.name, ok: true, output };
      } catch (err) {
        return {
          model: adapter.name,
          ok: false,
          error: err instanceof Error ? err.message : String(err)
        };
      }
    };
  });

  const results = await runConcurrent(calls);
  const consensus = determineConsensus(results);

  return {
    results,
    consensus
  };
}
