const { getMetrics } = require("./metrics");

// // Test developer
// const developerId = "DEV-001";

// // ===== Test 1: All-time =====
// console.log("=== ALL TIME ===");
// const allTime = getMetrics(developerId);
// console.log(allTime);

// // ===== Test 2: March =====
// console.log("\n=== MARCH (2026-03) ===");
// const march = getMetrics(developerId, "2026-03");
// console.log(march);

// // ===== Test 3: April =====
// console.log("\n=== APRIL (2026-04) ===");
// const april = getMetrics(developerId, "2026-04");
// console.log(april);

const { generateInsights } = require("./insights");

// Get metrics
const march = getMetrics("DEV-001", "2026-03");
const april = getMetrics("DEV-001", "2026-04");

// Generate insights
console.log("\n=== INSIGHTS (APRIL vs MARCH) ===");
const result = generateInsights(april, march);
console.log(result);