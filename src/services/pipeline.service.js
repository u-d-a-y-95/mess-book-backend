import models from "../models";
import CRUD from "./crud.service";

class Pipeline extends CRUD {
  constructor() {
    super(models.Pipeline);
  }

  async getPipelineById(filter) {
    console.log(filter)
    return models.Pipeline.aggregate([
      {$match:filter},
      // {
      //   $lookup:{
      //     from:"users",
      //     localField:"users.user",
      //     foreignField:"_id",
      //     as: "users.user"
      //   }
      // }
    ])
  }
}

export default new Pipeline();
