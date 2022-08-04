import moment from "moment";
import models from "../models";

class MealController {
  constructor() {}
  async getPipeline(req, res, next) {
    try {
      const result = await models.Pipeline.find()
        .sort({ createdAt: -1 })
        .populate("meals");
      res.json(
        result.map((line) => ({
          id: line._id,
          startDate: line.startDate,
          endDate: line.endDate,
          totalMeals: line.meals.reduce((acc, item) => acc + item.noOfMeal, 0),
          users: line.users,
        }))
      );
    } catch (error) {
      res.json(error);
    }
  }
  async createPipeLine(req, res, next) {
    try {
      const pipeline = new models.Pipeline(req.body);
      await pipeline.save();

      const startDate = moment(pipeline.startDate);
      const endDate = moment(pipeline.endDate);
      const diff = endDate.diff(startDate, "days");

      const meals = pipeline.users
        .map((item) => {
          const userMeals = [];
          for (let i = 0; i <= diff; i++) {
            userMeals.push({
              date: moment(pipeline.startDate).add(i, "d"),
              noOfMeal: 0,
              pipeline: pipeline._id,
              user: item.user,
            });
          }
          return userMeals;
        })
        .flat();
      const m = await models.Meal.insertMany(meals);

      const expenses = [];
      for (let i = 0; i <= diff; i++) {
        expenses.push({
          date: moment(pipeline.startDate).add(i, "d"),
          expense: 0,
          pipeline: pipeline._id,
        });
      }
      const e = await models.Expenses.insertMany(expenses);
      pipeline.meals = m.map((item) => item._id);
      pipeline.expenses = e.map((item) => item._id);
      await pipeline.save();
      res.json(pipeline);
    } catch (error) {
      res.json(error);
    }
  }

  async deletePipeLineById(req, res, nex) {
    try {
      const deletedPipeline = await models.Pipeline.findByIdAndDelete(
        req.params.id
      );
      const deletedMeals = await models.Meal.deleteMany({
        pipeline: deletedPipeline._id,
      });
      const deletedExpenses = await models.Expenses.deleteMany({
        pipeline: deletedPipeline._id,
      });
      res.json({
        pipeline: deletedPipeline,
        meals: deletedMeals,
        expenses: deletedExpenses,
      });
    } catch (error) {}
  }

  async getPipelineById(req, res, next) {
    try {
      const result = await models.Pipeline.findById(req.params.id)
        .populate({
          path: "meals",
          model: "Meals",
          populate: {
            path: "user",
            model: "Users",
            select: { password: 0 },
          },
        })
        .populate({
          path: "users",
          model: "Users",
          populate: {
            path: "user",
            model: "Users",
          },
        })
        .populate({
          path: "expenses",
          model: "Expenses",
        });
      res.status(200).json(result);
    } catch (error) {
      res.json(error);
    }
  }
}

export default new MealController();
