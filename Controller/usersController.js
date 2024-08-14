import UserModel from "../Models/UserModel.js";
import { generateUniqueUserId } from "../Utilities/uniqueIdGenerator.js";
import { UserValidator } from "../Utilities/validator.js";

export const getUser = async (req, res) => {
  try {
    const user = await UserModel.findOne({ userId: req.params.userId });
    if (user) {
      res.status(200).json({
        user,
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "User id does not exist",
      });
    }
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err.message,
    });
  }
};

export const newUser = async (req, res) => {
  try {
    if (!UserValidator(req.body)) {
      const userExists = await UserModel.findOne({ email: req.body.email });
      if (userExists) {
        res.status(400).json({
          status: "ERROR",
          messsage: "This Email Address already exists",
        });
      } else {
        const userId = await generateUniqueUserId()
          .then((userId) => userId)
          .catch((err) => console.log(err.message));
        req.body.userId = userId;
        const newUser = await UserModel.create(req.body);
        res.status(201).json({
          status: "SUCCESS",
          message:
            "New user created successfully with userId: " + newUser.userId,
        });
      }
    } else {
      const err = UserValidator(req.body);
      res.status(err.status).json({
        status: "ERROR",
        message: err.message,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "failed",
      message: err.message,
    });
  }
};

export const userLogin = async (req, res) => {
  try {
    const user = await UserModel.findOne({ userId: req.body.id });
    if (user) {
      if (user.password === req.body.password) {
        res.status(200).send(true);
      } else {
        res.status(400).json({
          message: "Incorrect user id or password",
        });
      }
    } else {
      res.status(400).json({
        message: "Incorrect user id or password",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "FAILED",
      message: err.message,
    });
  }
};
