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


function getManagerReport(managerId, month) {
    const developers = data.developers.filter(
        d => d.manager_id === managerId
    );

    const reports = developers.map(dev =>
        getMetrics(dev.developer_id, month)
    );

    // Aggregate metrics
    const avg = (arr) =>
        arr.reduce((a, b) => a + b, 0) / arr.length || 0;

    return {
        teamSize: developers.length,
        avgLeadTime: Number(avg(reports.map(r => r.leadTime)).toFixed(2)),
        avgCycleTime: Number(avg(reports.map(r => r.cycleTime)).toFixed(2)),
        avgBugRate: Number(avg(reports.map(r => r.bugRate)).toFixed(2)),
        totalDeployments: reports.reduce((sum, r) => sum + r.deploymentFrequency, 0),
        totalPRs: reports.reduce((sum, r) => sum + r.prThroughput, 0)
    };
}


module.exports = { getDeveloperReport, getManagerReport };

