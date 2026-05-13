import axios from "axios";
import Prediction from "../models/Prediction.js";

// @desc    Run heart disease prediction
// @route   POST /api/predict
// @access  Protected
export const runPrediction = async (req, res) => {
  try {
    const inputData = req.body;

    // Call ML service
    const mlResponse = await axios.post(
      `${process.env.ML_SERVICE_URL}/predict`,
      inputData
    );

    const { result, probability } = mlResponse.data;

    // Save prediction to database
    const prediction = await Prediction.create({
      user: req.user._id,
      inputData,
      result,
      probability,
    });

    res.status(201).json(prediction);
  } catch (error) {
    // If ML service is down, return a clear error
    if (error.code === "ECONNREFUSED") {
      return res
        .status(503)
        .json({ message: "ML service is unavailable. Please try again later." });
    }
    const mlBody = error.response?.data;
    const mlMessage =
      (typeof mlBody?.error === "string" && mlBody.error) ||
      (typeof mlBody?.message === "string" && mlBody.message) ||
      null;
    if (mlMessage) {
      return res.status(error.response.status || 502).json({ message: mlMessage });
    }
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get prediction history for logged in user
// @route   GET /api/predict/history
// @access  Protected
export const getPredictionHistory = async (req, res) => {
  try {
    const predictions = await Prediction.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.json(predictions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};