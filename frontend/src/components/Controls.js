import React from "react";

function Controls({ developers, selectedDev, setSelectedDev, month, setMonth, months }) {
    return (
        <div style={{ marginBottom: "20px" }}>

            <select value={selectedDev} onChange={(e) => setSelectedDev(e.target.value)}>
                <option value="">Select Developer</option>
                {developers.map((dev) => (
                    <option key={dev.developer_id} value={dev.developer_id}>
                        {dev.developer_name}
                    </option>
                ))}
            </select>

            <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                style={{ marginLeft: "10px" }}
            >
                <option value="">Select Month</option>
                {months.map((m) => (
                    <option key={m} value={m}>
                        {m}
                    </option>
                ))}
            </select>

        </div>
    );
}

export default Controls;