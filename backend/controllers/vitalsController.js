import Vitals from "../models/Vitals.js";

// @desc    Log new vitals entry
// @route   POST /api/vitals
// @access  Protected
export const logVitals = async (req, res) => {
  const { bloodPressure, heartRate, cholesterol, bloodSugar, weight, notes } =
    req.body;

  try {
    const vitals = await Vitals.create({
      user: req.user._id,
      bloodPressure,
      heartRate,
      cholesterol,
      bloodSugar,
      weight,
      notes,
    });

    res.status(201).json(vitals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all vitals for logged in user
// @route   GET /api/vitals
// @access  Protected
export const getVitals = async (req, res) => {
  try {
    const vitals = await Vitals.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.json(vitals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};