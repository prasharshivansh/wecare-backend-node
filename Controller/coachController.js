import CoachModel from "../Models/CoachModel.js";
import { generateUniqueCoachId } from "../Utilities/uniqueIdGenerator.js";
import { CoachValidator } from "../Utilities/validator.js";

export const newCoach = async (req, res) => {
  try {
    if (!CoachValidator(req.body)) {
      const coachExists = await CoachModel.findOne({ name: req.body.name });
      if (coachExists) {
        res.status(400).json({
          message: "Coach exists with this name",
        });
      } else {
        const coachId = await generateUniqueCoachId()
          .then((id) => id)
          .catch((err) => console.log(err.message));
        req.body.coachId = coachId;
        const newCoach = await CoachModel.create(req.body);
        res.status(201).json({
          status: "SUCCESS",
          message:
            "New Coach created successfully with coachId: " + newCoach.coachId,
        });
      }
    } else {
      const err = CoachValidator(req.body);
      res.status(err.status).json({
        status: "ERROR",
        message: err.message,
      });
    }
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err.message,
    });
  }
};

export const coachLogin = async (req, res) => {
  try {
    const coach = await CoachModel.findOne({ coachId: req.body.id });
    if (coach) {
      if (coach.password === req.body.password) {
        res.status(200).send(true);
      } else {
        res.status(400).json({
          message: "Incorrect coach id or password",
        });
      }
    } else {
      res.status(400).json({
        message: "Incorrect coach id or password",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "FAILED",
      message: err.message,
    });
  }
};

export const getAllCoaches = async (req, res) => {
  try {
    const coachesData = await CoachModel.find({}, { _id: 0, __v: 0 });
    if (coachesData.length > 0) {
      res.status(200).json({
        coachesData,
      });
    } else {
      res.status(400).json({
        status: "SUCCESS",
        message: "No coaches data available",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "FAILED",
      message: err.message,
    });
  }
};

export const getCoach = async (req, res) => {
  try {
    const coachData = await CoachModel.findOne({ coachId: req.params.coachId });
    if (coachData) {
      res.status(201).json({
        coachData,
      });
    } else {
      res.status(400).json({
        status: "SUCCESS",
        message: "Coach Id does not exist",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "FAILED",
      message: err.message,
    });
  }
};
