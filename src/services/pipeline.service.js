import moment from "moment";
import mongoose from "mongoose";
import models from "../models";
import { pipelineSchema } from "../models/pipeline.model";
import CRUD from "./crud.service";
import Meal from "./meal.service";
class Pipeline extends CRUD {
  constructor() {
    super(models.Pipeline);
  }

  async getUsersFromPipelineById(filter) {
    return models.Pipeline.findOne(filter)
      .populate({
        path: "users",
        model: "Users",
        populate: {
          path: "user",
          model: "Users",
          select: {
            password: 0,
          },
        },
      })
      .select({
        meals: 0,
        expenses: 0,
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

  async updatePipeLineById(filter, udpateData) {
    const updatedPipeline = await models.Pipeline.findOneAndUpdate(
      filter,
      { $push: { users: { $each: udpateData } } },
      { new: true }
    );
    const startDate = moment(updatedPipeline.startDate);
    const endDate = moment(updatedPipeline.endDate);
    const diff = endDate.diff(startDate, "days");
    const meals = udpateData
      .map((item) => {
        const userMeals = [];
        for (let i = 0; i <= diff; i++) {
          userMeals.push({
            date: moment(updatedPipeline.startDate).add(i, "d"),
            noOfMeal: 0,
            pipeline: updatedPipeline._id,
            user: item.user,
          });
        }
        return userMeals;
      })
      .flat();
    const m = await Meal.create(meals);
    const newUpdatedPipeline = await models.Pipeline.findOneAndUpdate(
      filter,
      { $push: { meals: { $each: m.map((item) => item._id) } } },
      { new: true }
    );
    return newUpdatedPipeline;
  }
}

export default new Pipeline();
