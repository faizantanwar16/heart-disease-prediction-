import express from "express";
import { logVitals, getVitals } from "../controllers/vitalsController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, logVitals);
router.get("/", protect, getVitals);

export default router;