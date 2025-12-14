import { measure } from "../utils/timer";
export class ChatGPTAdapter {
    async invoke(content) {
        return measure("chatgpt", async () => {
            // TODO: Call OpenAI API
            return {
                model: "chatgpt",
                content: "[ChatGPT response placeholder]",
                latencyMs: 0
            };
        });
    }
}
