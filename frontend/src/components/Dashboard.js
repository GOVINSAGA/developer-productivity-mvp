import React, { useEffect, useState } from "react";
import { getDevelopers, getReport } from "../api";
import MetricsCard from "./MetricsCard";
import Controls from "./Controls";

function Dashboard() {
    const [developers, setDevelopers] = useState([]);
    const [selectedDev, setSelectedDev] = useState("");
    const [month, setMonth] = useState("2026-04");
    const [report, setReport] = useState(null);

    useEffect(() => {
        getDevelopers().then(res => setDevelopers(res.data));
    }, []);

    const fetchReport = async () => {
        if (!selectedDev || !month) return;

        const prevMonth = "2026-03"; // simple logic for now

        const res = await getReport(selectedDev, month, prevMonth);
        setReport(res.data);
    };

    return (
        <div>
            <h2>Developer Productivity Dashboard</h2>

            <Controls
                developers={developers}
                selectedDev={selectedDev}
                setSelectedDev={setSelectedDev}
                month={month}
                setMonth={setMonth}
            />

            <button onClick={fetchReport}>Get Report</button>

            {report && (
                <div style={{ marginTop: "20px" }}>

                    <h3>Metrics</h3>
                    <div style={{ display: "flex", gap: "10px" }}>
                        <MetricsCard title="Lead Time" value={report.metrics.leadTime} />
                        <MetricsCard title="Cycle Time" value={report.metrics.cycleTime} />
                        <MetricsCard title="Bug Rate" value={report.metrics.bugRate} />
                        <MetricsCard title="Deployments" value={report.metrics.deploymentFrequency} />
                        <MetricsCard title="PRs" value={report.metrics.prThroughput} />
                    </div>

                    <h3>Insights</h3>
                    <ul>
                        {report.insights.map((i, idx) => <li key={idx}>{i}</li>)}
                    </ul>

                    <h3>Actions</h3>
                    <ul>
                        {report.actions.map((a, idx) => <li key={idx}>{a}</li>)}
                    </ul>

                    <h3>AI Summary</h3>
                    <p>{report.summary}</p>

                </div>
            )}
        </div>
    );
}

export default Dashboard;