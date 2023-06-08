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
  async getPipelineSummaryById(filter) {
    const [result] = await models.Pipeline.aggregate([
      {
        $match: {
          accountId: mongoose.Types.ObjectId(filter.accountId),
          _id: mongoose.Types.ObjectId(filter._id),
        },
      },
      {
        $unwind: "$expenses",
      },
      {
        $lookup: {
          from: "expenses", // Name of the "Expenses" collection
          localField: "expenses",
          foreignField: "_id",
          as: "expenseDocuments",
        },
      },
      {
        $unwind: "$expenseDocuments", // Unwind the joined expense documents
      },
      {
        $group: {
          _id: "$_id",
          startDate: { $first: "$startDate" },
          endDate: { $first: "$endDate" },
          totalExpenses: { $sum: "$expenseDocuments.expense" },
          users: { $first: "$users" },
        },
      },
      {
        $lookup: {
          from: "users", // Name of the "Users" collection
          localField: "users.user",
          foreignField: "_id",
          as: "userDocuments",
        },
      },
    ]);
    const users = await models.Pipeline.aggregate([
      {
        $match: {
          accountId: mongoose.Types.ObjectId(filter.accountId),
          _id: mongoose.Types.ObjectId(filter._id),
        },
      },
      {
        $lookup: {
          from: "meals", // Name of the "Meals" collection
          localField: "meals",
          foreignField: "_id",
          as: "mealDocuments",
        },
      },
      {
        $unwind: "$mealDocuments",
      },
      {
        $group: {
          _id: "$mealDocuments.user",
          user: { $first: "$mealDocuments.user" },
          totalMeals: { $sum: "$mealDocuments.noOfMeal" },
        },
      },
    ]);
    result.users.forEach((item) => {
      item["meals"] = users.find(
        (user) => item.user.toString() == user._id.toString()
      ).totalMeals;
      const userInfo = result.userDocuments.find(
        (doc) => doc._id.toString() === item.user.toString()
      );
      item["name"] = userInfo.name;
      item["displayName"] = userInfo.displayName;
    });
    delete result.userDocuments;
    return result;
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
  async changePipeLineStatusById(filter, status) {
    const updatedPipeline = await models.Pipeline.findOneAndUpdate(
      filter,
      {
        closed: status,
      },
      { new: true }
    );

    return updatedPipeline;
  }
}

export default new Pipeline();
