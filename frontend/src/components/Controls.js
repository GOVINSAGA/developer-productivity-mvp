import React from "react";

function Controls({
    view,
    setView,
    developers,
    managers,
    months,
    selectedDev,
    setSelectedDev,
    selectedManager,
    setSelectedManager,
    month,
    setMonth
}) {
    return (
        <div style={{ marginBottom: "20px" }}>

            {/* ✅ ADDED: View toggle */}
            <select value={view} onChange={(e) => setView(e.target.value)}>
                <option value="developer">Developer View</option>
                <option value="manager">Manager View</option>
            </select>

            {/* ===== Developer Dropdown ===== */}
            {view === "developer" && (
                <select value={selectedDev} onChange={(e) => setSelectedDev(e.target.value)}>
                    <option value="">Select Developer</option>
                    {(developers || []).map((dev) => (   // ✅ SAFE MAP
                        <option key={dev.developer_id} value={dev.developer_id}>
                            {dev.developer_name}
                        </option>
                    ))}
                </select>
            )}

            {/* ===== Manager Dropdown ===== */}
            {view === "manager" && (
                <select value={selectedManager} onChange={(e) => setSelectedManager(e.target.value)}>
                    <option value="">Select Manager</option>
                    {(managers || []).map((m) => (   // ✅ SAFE MAP
                        <option key={m.manager_id} value={m.manager_id}>
                            {m.manager_name}
                        </option>
                    ))}
                </select>
            )}

            {/* ===== Month Dropdown ===== */}
            <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                style={{ marginLeft: "10px" }}
            >
                <option value="">Select Month</option>
                {(months || []).map((m) => (   // ✅ SAFE MAP
                    <option key={m} value={m}>
                        {m}
                    </option>
                ))}
            </select>

        </div>
    );
}

export default Controls;