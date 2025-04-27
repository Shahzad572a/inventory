const express = require("express");
const { getDashboardMetrics } = require("../controllers/dashboardController");

const router = express.Router();

// Route for dashboard metrics
router.get("/", getDashboardMetrics);

module.exports = router;
