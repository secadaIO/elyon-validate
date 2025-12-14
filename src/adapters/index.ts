import { ChatGPTAdapter } from "./chatgpt";
import { GrokAdapter } from "./grok";

export function getAdapter(name: string) {
  switch (name) {
    case "chatgpt":
      return new ChatGPTAdapter();
    case "grok":
      return new GrokAdapter();
    default:
      throw new Error(`Unknown model adapter: ${name}`);
  }
}
