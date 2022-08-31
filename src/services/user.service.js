import models from "../models";
import CRUD from "./crud.service";
import fs from "fs/promises";
import path from "path";
class User extends CRUD {
  constructor() {
    super(models.User);
  }

  unlinkProfileImage = async (profileImage) => {
    const filePath = path.join(__dirname, "../uploads", profileImage);
    try {
      await fs.access(filePath);
      await fs.unlink(filePath);
    } catch (error) {}
  };
}

export default new User();
