import UserModel from "../Models/UserModel.js";
import { UserValidator } from "../Utilities/validator.js";

export const getUser = async (req, res) => {
  try {
    const user = await UserModel.find({}, { _id: 0, __v: 0 });
    if (user.length > 0) {
      res.status(200).json({
        status: "success",
        message: "data available",
        data: user,
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "data not available",
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
      const userExists = await UserModel.findOne({ username: req.body.username });
      const newUser = await UserModel.create(req.body);
      res.status(201).json({
        status: "SUCCESS",
        message: "New user created successfully",
      });
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
