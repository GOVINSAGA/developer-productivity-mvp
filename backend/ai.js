

const axios = require("axios");

async function generateNarrative(metrics, insights, actions) {
    const apiKey = process.env.NVIDIA_API_KEY;

    // Fallback if no key
    if (!apiKey) return null;

    try {
        const prompt = `
You are an engineering manager.

Metrics:
${JSON.stringify(metrics, null, 2)}

Insights:
${insights.join("\n")}

Actions:
${actions.join("\n")}

Write a short, professional summary (2-3 sentences).
`;

        const response = await axios.post(
            "https://integrate.api.nvidia.com/v1/chat/completions",
            {
                model: "nvidia/nemotron-3-super-120b-a12b", // ✅ REQUIRED
                messages: [
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                temperature: 0.7,
                top_p: 0.9,
                max_tokens: 200
            },
            {
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json"
                }
            }
        );

        return response.data.choices[0].message.content;

    } catch (err) {
        console.error("AI error:", err.response?.data || err.message);
        return null; // fallback
    }
}

module.exports = { generateNarrative };