const data = require("./data/data.json");

// helper
function average(arr) {
    if (!arr.length) return 0;
    return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function getMetrics(developerId, month = null) {
    const issues = data.issues.filter(i =>
        i.developer_id === developerId &&
        (!month || i.month_done === month)
    );

    const prs = data.pullRequests.filter(p =>
        p.developer_id === developerId &&
        (!month || p.month_merged === month)
    );

    const deployments = data.deployments.filter(d =>
        d.developer_id === developerId &&
        (!month || d.month_deployed === month)
    );

    const bugs = data.bugs.filter(b =>
        b.developer_id === developerId &&
        (!month || b.month_found === month)
    );

    const cycleTime = average(
        issues.map(i => i.cycle_time_days).filter(Boolean)
    );

    const leadTime = average(
        deployments.map(d => d.lead_time_days).filter(Boolean)
    );

    const bugRate = issues.length === 0 ? 0 : bugs.length / issues.length;

    return {
        leadTime: Number(leadTime.toFixed(2)),
        cycleTime: Number(cycleTime.toFixed(2)),
        bugRate: Number(bugRate.toFixed(2)),
        deploymentFrequency: deployments.length,
        prThroughput: prs.length
    };
}

// ✅ REQUIRED
module.exports = { getMetrics };