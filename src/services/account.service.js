import models from "../models";
import CRUD from "./crud.service";

class Account extends CRUD {
  constructor() {
    super(models.Account);
  }
}

export default new Account();
