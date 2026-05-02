require("dotenv").config();

const { getDeveloperReport } = require("./service");

(async () => {
  const report = await getDeveloperReport("DEV-001", "2026-04", "2026-03");

  console.log(JSON.stringify(report, null, 2));
})();