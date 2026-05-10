const express = require("express");
const cors = require("cors");
require("dotenv").config();

const fitbitRoutes = require("./routes/fitbit");

const app = express();

// Middleware
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());

// Routes
app.use("/api/fitbit", fitbitRoutes);

// Test routes
app.get("/", (req, res) => {
    res.send("HeartGuard Backend is running 🚀");
});

app.get("/api/test", (req, res) => {
    res.json({
        message: "API is working ✅",
        status: "success"
    });
});

module.exports = app;

console.log("CLIENT ID:", process.env.FITBIT_CLIENT_ID);
console.log("REDIRECT URI:", process.env.FITBIT_REDIRECT_URI);