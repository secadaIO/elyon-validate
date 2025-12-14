import { chatgptAdapter } from "./chatgpt.js";
import { grokAdapter } from "./grok.js";
import type { Adapter } from "./types";

const registry: Record<string, Adapter> = {
  chatgpt: chatgptAdapter,
  grok: grokAdapter
};

export function getAdapter(name: string): Adapter {
  const adapter = registry[name];
  if (!adapter) {
    throw new Error(`Unknown adapter: ${name}`);
  }
  return adapter;
}

