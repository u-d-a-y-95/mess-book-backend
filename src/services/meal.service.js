import models from "../models";
import CRUD from "./crud.service";

class MealService extends CRUD {

  constructor(){
    super(models.Meal)
  }

  changeMeal = async (id, updateValue) => {
    const updatedData = await models.Meal.findByIdAndUpdate(id, updateValue, {
      new: true,
    });
    return updatedData;
  };

  changeUserDepositAmount = async (id, userId, depositAmount) => {
    const data = await models.Pipeline.findOneAndUpdate(
      {
        _id: id,
        "users._id": userId,
      },
      { "users.$.depositAmount": depositAmount },
      {
        new: true,
      }
    );
    return data;
  };

  changeExpense = async ({ _id, pipeline, expense }) => {
    const result = await models.Expenses.findByIdAndUpdate(
      _id,
      {
        expense,
      },
      {
        new: true,
      }
    );
    return result;
  };
}

export default new MealService();
