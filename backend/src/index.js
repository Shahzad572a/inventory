// Import required packages using CommonJS style
const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

// Import routes
const dashboardRoutes = require("./routes/dashboardRoutes");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const expenseRoutes = require("./routes/expenseRoutes");

// Load environment variables from .env file
dotenv.config();

// Initialize express app
const app = express();

// Middleware configurations
app.use(express.json()); // Parse incoming JSON requests
app.use(helmet()); // Security headers
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); // Allow cross-origin resource sharing
app.use(morgan("common")); // Log HTTP requests
app.use(bodyParser.json()); // Parse application/json
app.use(bodyParser.urlencoded({ extended: false })); // Parse application/x-www-form-urlencoded
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)

// Routes setup
app.use("/dashboard", dashboardRoutes); // Route for dashboard APIs (example: http://localhost:8000/dashboard)
app.use("/products", productRoutes);    // Route for products APIs (example: http://localhost:8000/products)
app.use("/users", userRoutes);           // Route for users APIs (example: http://localhost:8000/users)
app.use("/expenses", expenseRoutes);     // Route for expenses APIs (example: http://localhost:8000/expenses)

// Start server
const port = Number(process.env.PORT) || 3001;
app.listen(port, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${port}`);
});
