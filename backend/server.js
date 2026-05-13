import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";

// Routes
import authRoutes from "./routes/auth.js";
import predictRoutes from "./routes/predict.js";
import vitalsRoutes from "./routes/vitals.js";
import userRoutes from "./routes/user.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, ".env") });
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/predict", predictRoutes);
app.use("/api/vitals", vitalsRoutes);
app.use("/api/user", userRoutes);

// Base route
app.get("/", (req, res) => {
  res.send("HeartGuard API Running ✅");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});