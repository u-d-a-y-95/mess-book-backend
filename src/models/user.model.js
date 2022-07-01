import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
    unique:true,
  },
  gender: {
    value: Number,
    label: String,
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Users", userSchema);
