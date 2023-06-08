import moment from "moment";
import models from "../models";
import services from "../services";

class MealController {
  constructor() {}
  async getPipeline(req, res, next) {
    const { skip = 0, limit = 5 } = req.query;
    try {
      const result = await models.Pipeline.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("meals");
      const count = await models.Pipeline.count();
      res.json({
        count,
        data: result.map((line) => ({
          id: line._id,
          startDate: line.startDate,
          endDate: line.endDate,
          totalMeals: line.meals.reduce((acc, item) => acc + item.noOfMeal, 0),
          users: line.users,
          closed: line.closed,
        })),
      });
    } catch (error) {
      res.json(error);
    }
  }
  async createPipeLine(req, res, next) {
    try {
      const { accountId } = req.user;
      const pipeline = await services.Pipeline.createOne({
        accountId,
        ...req.body,
      });

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
      const m = await services.Meal.create(meals);
      const expenses = [];
      for (let i = 0; i <= diff; i++) {
        expenses.push({
          date: moment(pipeline.startDate).add(i, "d"),
          expense: 0,
          pipeline: pipeline._id,
        });
      }
      const e = await services.Expense.create(expenses);
      pipeline.meals = m.map((item) => item._id);
      pipeline.expenses = e.map((item) => item._id);
      await pipeline.save();
      res.json(pipeline);
    } catch (error) {
      res.json(error);
    }
  }

  async updatePipeLineById(req, res, next) {
    try {
      const { accountId } = req.user;
      const { id: _id } = req.params;
      const newUsers = req.body.users
        .filter((user) => !user._id)
        .map((item) => ({
          user: item.user.value,
          initialBalance: item.initialBalance,
          depositAmount: 0,
        }));
      const updatedPipeline = await services.Pipeline.updatePipeLineById(
        { accountId, _id },
        newUsers
      );
      res.json(updatedPipeline);
    } catch (error) {
      next(error);
    }
  }

  async deletePipeLineById(req, res, next) {
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

  async changePipeLineStatusById(req, res, next) {
    try {
      const { accountId } = req.user;
      const { id: _id } = req.params;
      const { status } = req.body;
      const updatedPipeline = await services.Pipeline.changePipeLineStatusById(
        { accountId, _id },
        status
      );
      res.json(updatedPipeline);
    } catch (error) {
      next(error);
    }
  }

  async getUsersFromPipelineById(req, res, next) {
    try {
      const { accountId } = req.user;
      const { id: _id } = req.params;
      const result = await services.Pipeline.getUsersFromPipelineById({
        accountId,
        _id,
      });

      res.status(200).json(result);
    } catch (error) {
      res.json(error);
    }
  }
  async getPipelineById(req, res, next) {
    try {
      const { accountId } = req.user;
      const { id: _id } = req.params;
      const result = await services.Pipeline.getPipelineById({
        accountId,
        _id,
      });

      res.status(200).json(result);
    } catch (error) {
      res.json(error);
    }
  }
  async getPipelineSummaryById(req, res, next) {
    try {
      const { accountId } = req.user;
      const { id: _id } = req.params;
      const result = await services.Pipeline.getPipelineSummaryById({
        accountId,
        _id,
      });

      res.status(200).json(result);
    } catch (error) {
      res.json(error);
    }
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
