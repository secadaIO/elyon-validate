const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) {
    throw new Error("Missing OPENAI_API_KEY");
}
export const chatgptAdapter = {
    name: "chatgpt",
    async invoke(input) {
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${OPENAI_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "gpt-4.1-mini",
                messages: [
                    { role: "user", content: input }
                ],
                temperature: 0
            })
        });
        if (!res.ok) {
            const text = await res.text();
            throw new Error(`ChatGPT error: ${text}`);
        }
        const data = await res.json();
        return data.choices[0].message.content.trim();
    }
};
