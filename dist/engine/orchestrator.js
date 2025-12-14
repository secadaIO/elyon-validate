import { getAdapter } from "../adapters/index.js";
import { runConcurrent } from "./concurrency.js";
export async function orchestrate(req) {
    const calls = req.models.map(model => {
        const adapter = getAdapter(model);
        return async () => {
            try {
                const output = await adapter.invoke(req.content);
                return { model: adapter.name, output, ok: true };
            }
            catch (err) {
                return {
                    model: adapter.name,
                    ok: false,
                    error: err instanceof Error ? err.message : String(err)
                };
            }
        };
    });
    return runConcurrent(calls);
}
