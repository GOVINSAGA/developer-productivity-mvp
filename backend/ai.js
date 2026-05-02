const axios = require("axios");

async function generateNarrative(metrics, insights, actions, developerName = "Developer") {
    const apiKey = process.env.NVIDIA_API_KEY;

    // Fallback if no key
    if (!apiKey) return null;

    try {
        const prompt = `
You are an engineering manager giving feedback to a developer.

Developer: ${developerName}

Metrics:
- Lead Time: ${metrics.leadTime} days
- Cycle Time: ${metrics.cycleTime} days
- Bug Rate: ${metrics.bugRate}
- Deployment Frequency: ${metrics.deploymentFrequency}
- PR Throughput: ${metrics.prThroughput}

Insights:
${insights.map(i => `- ${i}`).join("\n")}

Actions:
${actions.map(a => `- ${a}`).join("\n")}

Write a short, clear 2–3 sentence summary.
- Address the developer directly
- Mention any important change (like lead time increase)
- Be concise and actionable
- Do NOT include reasoning or instructions
`;

        const response = await axios.post(
            "https://integrate.api.nvidia.com/v1/chat/completions",
            {
                model: "nvidia/nemotron-3-super-120b-a12b",
                messages: [
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                temperature: 0.4,   // 🔥 reduced for more deterministic output
                top_p: 0.9,
                max_tokens: 150
            },
            {
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const content = response?.data?.choices?.[0]?.message?.content?.trim();

        return content || null;

    } catch (err) {
        console.error("AI error:", err.response?.data || err.message);
        return null; // graceful fallback
    }
}

module.exports = { generateNarrative };