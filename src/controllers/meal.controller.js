import moment from "moment";
import models from "../models";

class MealController {
  constructor() {}
  async getPipeline(req, res, next) {
    try {
      const result = await models.Pipeline.find().populate("meals");
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
      console.log(error);
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
      // console.log(models.Meal.bulkSave)
      const m = await models.Meal.insertMany(meals);
      res.json(m);
      pipeline.meals = m.map((item) => item._id);
      await pipeline.save();
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  }

  async deletePipeLineById(req,res,nex){
    try {
      const deletedPipeline = await models.Pipeline.findByIdAndDelete(req.params.id)
      const deletedMeals = await models.Meal.deleteMany({pipeline:deletedPipeline._id})
      res.json({
        pipeline:deletedPipeline,
        meals:deletedMeals
      })
    } catch (error) {
      
    }
   
  }
}

export default new MealController();
