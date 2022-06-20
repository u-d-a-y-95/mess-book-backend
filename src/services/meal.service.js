import models from "../models";

class MealService {
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
}

export default new MealService();
