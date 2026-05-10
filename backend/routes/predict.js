import express from "express";
import {
  runPrediction,
  getPredictionHistory,
} from "../controllers/predictController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, runPrediction);
router.get("/history", protect, getPredictionHistory);

export default router;