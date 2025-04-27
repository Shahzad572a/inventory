const express = require("express");
const { getExpensesByCategory } = require("../controllers/expenseController");

const router = express.Router();

// Route for getting expenses by category
router.get("/", getExpensesByCategory);

module.exports = router;
