import { ModelResponse } from "../types";
import { measure } from "../utils/timer";

export class GrokAdapter {
  async invoke(content: string): Promise<ModelResponse> {
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
