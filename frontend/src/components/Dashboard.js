import React, { useEffect, useState } from "react";
import { getDevelopers, getReport, getMonths, getManagerReport } from "../api"; // ✅ ADDED manager API
import MetricsCard from "./MetricsCard";
import Controls from "./Controls";

function Dashboard() {
    // ===== STATE =====
    const [developers, setDevelopers] = useState([]);
    const [managers, setManagers] = useState([]); // ✅ ADDED for manager dropdown

    const [selectedDev, setSelectedDev] = useState("");
    const [selectedManager, setSelectedManager] = useState(""); // ✅ ADDED

    const [month, setMonth] = useState(""); // ✅ FIXED (was [] ❌)
    const [months, setMonths] = useState([]);

    const [report, setReport] = useState(null);

    const [view, setView] = useState("developer"); // ✅ ADDED (toggle)

    // ===== HELPER: extract managers from developers =====
    function extractManagers(developers) {
        const map = new Map();

        developers.forEach(d => {
            map.set(d.manager_id, d.manager_name);
        });

        return Array.from(map, ([id, name]) => ({
            manager_id: id,
            manager_name: name
        }));
    }

    // ===== FIXED: single useEffect (you had duplicate ❌) =====
    useEffect(() => {
        getDevelopers().then(res => {
            setDevelopers(res.data);
            setManagers(extractManagers(res.data)); // ✅ ADDED
        });

        getMonths().then(res => setMonths(res.data));
    }, []);

    // ===== UPDATED: handle both views =====
    const fetchReport = async () => {
        if (!month) return;

        if (view === "developer") {
            if (!selectedDev) return;

            const prevMonth = "2026-03";

            const res = await getReport(selectedDev, month, prevMonth);
            setReport(res.data);

        } else {
            // ✅ MANAGER FLOW
            if (!selectedManager) return;

            const res = await getManagerReport(selectedManager, month);
            setReport(res.data);
        }
    };

    return (
        <div>
            <h2>Developer Productivity Dashboard</h2>

            {/* ✅ UPDATED Controls (manager props added) */}
            <Controls
                view={view}
                setView={setView}
                developers={developers}
                managers={managers}
                months={months}
                selectedDev={selectedDev}
                setSelectedDev={setSelectedDev}
                selectedManager={selectedManager}
                setSelectedManager={setSelectedManager}
                month={month}
                setMonth={setMonth}
            />

            <button onClick={fetchReport}>Get Report</button>

            {/* ===== DEVELOPER VIEW ===== */}
            {view === "developer" && report && (
                <div style={{ marginTop: "20px" }}>
                    <h3>Metrics</h3>

                    <div style={{ display: "flex", gap: "10px" }}>
                        <MetricsCard title="Lead Time" value={report?.metrics?.leadTime || 0} />
                        <MetricsCard title="Cycle Time" value={report?.metrics?.cycleTime || 0} />
                        <MetricsCard title="Bug Rate" value={report?.metrics?.bugRate || 0} />
                        <MetricsCard title="Deployments" value={report?.metrics?.deploymentFrequency || 0} />
                        <MetricsCard title="PRs" value={report?.metrics?.prThroughput || 0} />
                    </div>

                    <h3>Insights</h3>
                    <ul>
                        {(report?.insights || []).map((i, idx) => <li key={idx}>{i}</li>)}
                    </ul>

                    <h3>Actions</h3>
                    <ul>
                        {(report?.actions || []).map((a, idx) => <li key={idx}>{a}</li>)}
                    </ul>

                    <h3>AI Summary</h3>
                    <p>{report?.summary || ""}</p>
                </div>
            )}


            {/* Manger View */}
            {view === "manager" && report && (
                <div style={{ marginTop: "20px" }}>
                    <h3>Team Metrics</h3>

                    <p>Team Size: {report.teamSize}</p>
                    <p>Avg Lead Time: {report.avgLeadTime}</p>
                    <p>Avg Cycle Time: {report.avgCycleTime}</p>
                    <p>Avg Bug Rate: {report.avgBugRate}</p>
                    <p>Total Deployments: {report.totalDeployments}</p>
                    <p>Total PRs: {report.totalPRs}</p>
                </div>
            )}
        </div>
    );
}

export default Dashboard;