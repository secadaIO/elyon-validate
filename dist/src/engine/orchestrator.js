import { getAdapter } from "../adapters/index";
import { runConcurrent } from "./concurrency";
export async function orchestrate(req) {
    const calls = req.models.map(model => {
        const adapter = getAdapter(model);
        return () => adapter.invoke(req.content);
    });
    return runConcurrent(calls);
}
