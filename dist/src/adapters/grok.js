import { measure } from "../utils/timer";
export class GrokAdapter {
    async invoke(content) {
        return measure("grok", async () => {
            // TODO: Call Grok API
            return {
                model: "grok",
                content: "[Grok response placeholder]",
                latencyMs: 0
            };
        });
    }
}
