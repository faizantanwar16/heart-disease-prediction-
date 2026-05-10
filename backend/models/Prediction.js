import mongoose from "mongoose";

const predictionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    inputData: {
      type: Object,
      required: true,
    },
    result: {
      type: String,
      required: true,
    },
    probability: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Prediction", predictionSchema);