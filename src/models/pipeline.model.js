import mongoose from "mongoose";
import userModel from "./user.model";

const pipelineSchema = new mongoose.Schema({
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  users: [
    {
      user: { type: mongoose.Types.ObjectId, ref: "Users" },
      initialBalance: {
        type: Number,
        default: 0,
      },
      depositAmount: {
        type: Number,
        default: 0,
      },
    },
  ],
  meals:[
     {
          type:mongoose.Types.ObjectId,
          ref:"Meals"
      }
  ]
});

export default mongoose.model("Pipelines", pipelineSchema);
