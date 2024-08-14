import { model, Schema } from "mongoose";

const CoachSchema = new Schema({
  coachId: {
    type: String,
    unique: true,
    required: [true, "required"],
  },
  name: {
    type: String,
    required: [true, "required"],
  },
  password: {
    type: String,
    required: [true, "required"],
  },
  gender: {
    type: String,
    required: [true, "required"],
  },
  dateOfBirth: {
    type: Date,
  },
  mobileNumber: {
    type: Number,
  },
  specialty: {
    type: String,
  },
});

const CoachModel = model("Coaches", CoachSchema);
export default CoachModel;
