import mongoose from "mongoose";

const vitalsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bloodPressure: {
      type: String,
    },
    heartRate: {
      type: Number,
    },
    cholesterol: {
      type: Number,
    },
    bloodSugar: {
      type: Number,
    },
    weight: {
      type: Number,
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Vitals", vitalsSchema);