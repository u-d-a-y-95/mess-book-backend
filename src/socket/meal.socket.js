import services from "../services";

class Meal {
  async changeMeal(value) {
    const socket = this;
    try {
      const result = await services.Meal.changeMeal(value.mealObj._id, {
        noOfMeal: value.meal,
      });
      this.broadcast.emit("changeMealClient", {
        ...value,
        updatedData: result,
      });
    } catch (error) {}
  }
  async changeUser(value) {
    const socket = this;
    const {
      pipelineId,
      user: { _id: userId },
      newAmount,
    } = value;
    const result = await services.Meal.changeUserDepositAmount(
      pipelineId,
      userId,
      newAmount
    );
    socket.broadcast.emit("changeUserClient", {
      ...value,
      updatedData: result,
    });
  }
  async changeExpense(value) {
    const socket = this;
    const result = await services.Meal.changeExpense(value);
    const obj = {
      ...result._doc,
      index: value.index,
    };
    socket.broadcast.emit("changeExpenseClient", obj);
  }
}
export default new Meal();
