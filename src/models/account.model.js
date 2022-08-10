import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

AccountSchema.index({ name: 1, email: 1 }, { unique: true });

export default mongoose.model("Accounts", AccountSchema);
