const express = require("express");

const app = express();

// Middleware
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.send("Backend is working perfectly 🚀");
});

// Another test route
app.get("/api/test", (req, res) => {
    res.json({
        message: "API is working ✅",
        status: "success"
    });
});

module.exports = app;