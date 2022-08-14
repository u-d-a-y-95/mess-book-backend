const dataFilter = {
  project: {},
  sort: {},
  skip: null,
  limit: null,
};

class CRUD {
  constructor(model) {
    this.model = model;
  }

  //create
  async create(objs) {
    try {
      return this.model.insertMany(objs);
    } catch (error) {
      console.error(error);
    }
  }
  async createOne(obj) {
    try {
      const newObj = new this.model(obj);
      return newObj.save();
    } catch (error) {}
  }

  // get
  async get(filter, other = null) {
    const _other = Object.assign(dataFilter, other);
    try {
      return this.model
        .find(filter)
        .select(_other.select)
        .sort(_other.sort)
        .skip(_other.skip)
        .limit(_other.limit);
    } catch (error) {
      throw error;
    }
  }

  async getOne(filter, other = null) {
    const _other = Object.assign(dataFilter, other);
    try {
      return this.model.findOne(filter).select(_other.select);
    } catch (error) {
      throw error;
    }
  }

  // update
  async updateOne(filter, updateData, other = null) {
    const _other = Object.assign(dataFilter, other);
    try {
      return this.model
        .findOneAndUpdate(filter, updateData, {
          new: true,
        })
        .select(_other.select);
    } catch (error) {
      throw error;
    }
  }

  //delete
  async deleteOne(filter, other) {
    const _other = Object.assign(dataFilter, other);
    try {
      return this.model.findOneAndDelete(filter).select(_other.select);
    } catch (error) {
      throw error;
    }
  }
}

export default CRUD;
