import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema({
  name: String,
  value: Number,
});

export default mongoose.model("Role", RoleSchema);
