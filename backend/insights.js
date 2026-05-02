function generateInsights(metrics, previousMetrics = null) {
    const insights = [];
    const actions = [];

    const { leadTime, cycleTime, bugRate, deploymentFrequency, prThroughput } = metrics;

    // ===== Lead Time =====
    if (leadTime > 4) {
        insights.push("Lead time is high, indicating delays in getting code to production.");
        actions.push("Reduce PR size and improve review turnaround time.");
    } else {
        insights.push("Lead time is within a healthy range.");
    }

    // ===== Cycle Time =====
    if (cycleTime > 5) {
        insights.push("Cycle time is high, suggesting slow task completion.");
        actions.push("Break tasks into smaller units and reduce dependencies.");
    } else {
        insights.push("Cycle time is efficient.");
    }

    // ===== Bug Rate =====
    if (bugRate > 0.2) {
        insights.push("High bug rate detected after deployments.");
        actions.push("Increase test coverage and improve QA processes.");
    } else {
        insights.push("Bug rate is low, indicating stable releases.");
    }

    // ===== Deployment Frequency =====
    if (deploymentFrequency < 2) {
        insights.push("Low deployment frequency observed.");
        actions.push("Increase release frequency with smaller deployments.");
    } else {
        insights.push("Deployment frequency is healthy.");
    }

    // ===== PR Throughput =====
    if (prThroughput < 2) {
        insights.push("Low PR throughput detected.");
        actions.push("Encourage smaller, more frequent PRs.");
    } else {
        insights.push("PR throughput is good.");
    }

    // ===== Trend Analysis (IMPORTANT) =====
    if (previousMetrics) {
        if (leadTime > previousMetrics.leadTime) {
            insights.push("Lead time has increased compared to previous period.");
            actions.push("Investigate bottlenecks in code review or deployment pipeline.");
        }

        if (cycleTime > previousMetrics.cycleTime) {
            insights.push("Cycle time has increased compared to previous period.");
        }
    }

    return { insights, actions };
}

module.exports = { generateInsights };