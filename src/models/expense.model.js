import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    expense: {
      type: Number,
      default: 0,
    },
    pipeline: {
      type: mongoose.Types.ObjectId,
      ref: "Pipelines",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Expenses", expenseSchema);
