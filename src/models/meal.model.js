import mongoose from "mongoose";

const mealSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    noOfMeal: {
      type: Number,
      default: 0,
    },
    pipeline: {
      type: mongoose.Types.ObjectId,
      ref: "Pipelines",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Meals", mealSchema);
