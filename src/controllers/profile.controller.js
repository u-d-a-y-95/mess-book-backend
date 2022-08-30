import services from "../services";
class ProfileController {
  async getUserById(req, res, next) {
    try {
      const { accountId } = req.user;
      const { id: _id } = req.params;
      const result = await services.User.getOne(
        { accountId, _id },
        { select: { password: 0 } }
      );
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async updateUserById(req, res, next) {
    try {
      const { accountId } = req.user;
      const { id: _id } = req.params;
      const result = await services.User.updateOne(
        { accountId, _id },
        req.body,
        {
          select: { password: 0 },
        }
      );
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async updateProfileImageByUserId(req, res, next) {
    try {
      const { accountId } = req.user;
      const { id: _id } = req.params;
      const found = await services.User.getOne(
        { accountId, _id },
        { select: { password: 0 } }
      );
      if (found.profileImage) {
        services.User.unlinkProfileImage(found.profileImage);
      }
      const result = await services.User.updateOne(
        {
          accountId,
          _id,
        },
        {
          profileImage: req.file.filename,
        },
        {
          select: {
            password: 0,
          },
        }
      );
      const { password, ...rest } = result._doc;
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  }
}

export default new ProfileController();
