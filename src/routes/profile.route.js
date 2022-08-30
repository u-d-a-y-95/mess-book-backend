import express from "express";
import controller from "../controllers";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/uploads/");
  },
  filename: function (req, file, cb) {
    const extension = file.originalname.split(".").pop()
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9) +"."+extension;
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });
const router = express.Router();

router.get("/:id", controller.Profile.getUserById);

router.patch(
  "/:id/changeProfileImage",
  upload.single("profileImage"),
  controller.Profile.updateProfileImageByUserId
);

router.patch(
  "/:id",
  //   payloadValidator(dto.User.userUpdateDto),
  controller.Profile.updateUserById
);

export default router;
