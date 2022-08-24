import mongoose from "mongoose";
import models from "../models";
import { pipelineSchema } from "../models/pipeline.model";
import CRUD from "./crud.service";

class Pipeline extends CRUD {
  constructor() {
    super(models.Pipeline);
  }

  async getUsersFromPipelineById(filter) {
    return models.Pipeline.findOne(filter).populate({
      path: "users",
      model: "Users",
      populate: {
        path: "user",
        model: "Users",
        select:{
          password:0
        }
      },
    }).select({
      meals:0,
      expenses:0
    });
  }
  async getPipelineById(filter) {
    return models.Pipeline.aggregate([
      {
        $match: {
          accountId: mongoose.Types.ObjectId(filter.accountId),
          _id: mongoose.Types.ObjectId(filter._id),
        },
      },
      {
        $unwind: "$users",
      },
      {
        $lookup: {
          from: "users",
          localField: "users.user",
          foreignField: "_id",
          as: "users.user",
        },
      },
      {
        $group: {
          _id: "$_id",
          meals: { $first: "$meals" },
          users: { $push: "$users" },
        },
      },
    ]);
  }
}

export default new Pipeline();
