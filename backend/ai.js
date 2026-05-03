const axios = require("axios");

// 🔒 Guardrail to filter bad AI outputs
function cleanAIOutput(text) {
    if (!text) return null;

    const badPatterns = [
        "We need to",
        "The prompt says",
        "We should",
        "So we can say",
        "Ensure",
        "This means"
    ];

    const isBad = badPatterns.some(p => text.includes(p));

    if (isBad) return null;

    return text.trim();
}

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
                temperature: 0.4,
                top_p: 0.9,
                max_tokens: 180   // 🔥 slightly increased to avoid truncation
            },
            {
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const content = response?.data?.choices?.[0]?.message?.content?.trim();

        // 🔒 Apply cleaning
        return cleanAIOutput(content);

    } catch (err) {
        console.error("AI error:", err.response?.data || err.message);
        return null; // graceful fallback
    }
}

module.exports = { generateNarrative };