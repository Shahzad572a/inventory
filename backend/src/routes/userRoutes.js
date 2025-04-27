const express = require("express");
const { getUsers } = require("../controllers/userController");

const router = express.Router();

// Route for getting users
router.get("/", getUsers);

module.exports = router;
