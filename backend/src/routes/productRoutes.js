const express = require("express");
const { createProduct, getProducts } = require("../controllers/productController");

const router = express.Router();

// Define your product routes
router.get("/", getProducts);    // GET /products - fetch all products (with optional search)
router.post("/", createProduct); // POST /products - create a new product

module.exports = router;
