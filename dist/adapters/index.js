import { chatgptAdapter } from "./chatgpt.js";
import { grokAdapter } from "./grok.js";
const registry = {
    chatgpt: chatgptAdapter,
    grok: grokAdapter
};
export function getAdapter(name) {
    const adapter = registry[name];
    if (!adapter) {
        throw new Error(`Unknown adapter: ${name}`);
    }
    return adapter;
}
