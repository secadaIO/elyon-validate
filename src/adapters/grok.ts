import type { Adapter } from "./types";

const GROK_API_KEY = process.env.GROK_API_KEY;

if (!GROK_API_KEY) {
  throw new Error("Missing GROK_API_KEY");
}

export const grokAdapter: Adapter = {
  name: "grok",

  async invoke(input: string): Promise<string> {
    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROK_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "grok-2-latest",
        messages: [
          { role: "user", content: input }
        ],
        temperature: 0
      })
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Grok error: ${text}`);
    }

    const data = await res.json();
    return data.choices[0].message.content.trim();
  }
};
