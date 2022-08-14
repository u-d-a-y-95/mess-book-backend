import models from "../models";
import CRUD from "./crud.service";

class Expense extends CRUD {
  constructor() {
    super(models.Expenses);
  }
}

export default new Expense()
