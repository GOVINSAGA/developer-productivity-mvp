require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { getDeveloperReport } = require("./service");
const data = require("./data/data.json");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


// ===== HEALTH CHECK =====
app.get("/", (req, res) => {
    res.send("🚀 Developer Productivity API is running");
});


// ===== GET ALL DEVELOPERS =====
app.get("/developers", (req, res) => {
    res.json(data.developers);
});

// ===== GET SINGLE DEVELOPER =====
app.get("/developers/:id", (req, res) => {
    const dev = data.developers.find(
        d => d.developer_id === req.params.id
    );

    if (!dev) {
        return res.status(404).json({ error: "Developer not found" });
    }

    res.json(dev);
});


// ===== GET REPORT =====
app.get("/report", async (req, res) => {
    try {
        const { developerId, month, previousMonth } = req.query;

        if (!developerId || !month) {
            return res.status(400).json({
                error: "developerId and month are required"
            });
        }

        const report = await getDeveloperReport(
            developerId,
            month,
            previousMonth
        );

        res.json(report);

    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Internal server error"
        });
    }
});


// ===== START SERVER =====
app.listen(PORT, () => {
    console.log(`🔥 Server running on http://localhost:${PORT}`);
});