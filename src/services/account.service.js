import models from "../models";

class Account {
  async createAccount(obj) {
    const account = models.Account(obj);
    return account.save();
  }
  async getAccountByfilter(filter) {
    return models.Account.findOne(filter);
  }
}

export default new Account();
