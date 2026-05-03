import React from "react";

function Controls({ developers, selectedDev, setSelectedDev, month, setMonth }) {
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

            <input
                type="month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                style={{ marginLeft: "10px" }}
            />
        </div>
    );
}

export default Controls;