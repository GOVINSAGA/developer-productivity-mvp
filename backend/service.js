const data = require("./data/data.json"); // ✅ FIX ADDED

const { getMetrics } = require("./metrics");
const { generateInsights } = require("./insights");
const { generateNarrative } = require("./ai");

async function getDeveloperReport(developerId, month, previousMonth = null) {
    const currentMetrics = getMetrics(developerId, month);
    const previousMetrics = previousMonth
        ? getMetrics(developerId, previousMonth)
        : null;

    const { insights, actions } = generateInsights(currentMetrics, previousMetrics);

    const developer = data.developers.find(d => d.developer_id === developerId);

    // Try AI (optional)
    const aiSummary = await generateNarrative(
        currentMetrics,
        insights,
        actions,
        developer?.developer_name?.split(" ")[0] || developerId
    );

    return {
        metrics: currentMetrics,
        insights,
        actions,
        summary: aiSummary || "AI summary not available. Showing rule-based insights."
    };
}

module.exports = { getDeveloperReport };