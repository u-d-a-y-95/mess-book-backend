import models from "../models";
import { getBcryptValue } from "../utils/bcrypt";
import CustomError from "../utils/CustomError";
import CRUD from "./crud.service";
class User extends CRUD {
  constructor() {
    super(models.User);
  }
}

export default new User();
