import mongoose, { Mongoose } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    accountId: {
      type: mongoose.Types.ObjectId,
      ref: "Accounts",
    },
    name: {
      type: String,
      required: true,
      minlength: 4,
    },
    displayName: String,
    email: String,
    mobile: {
      type: String,
      required: true,
      minlength: 11,
    },
    gender: {
      value: Number,
      label: String,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["ADMIN", "MODERATOR", "GENERAL"],
      default: "GENERAL",
    },
  },
  { timestamps: true }
);

userSchema.index({ accountId: 1, mobile: 1 }, { unique: true });

export default mongoose.model("Users", userSchema);
