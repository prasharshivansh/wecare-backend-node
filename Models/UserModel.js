import { model, Schema } from "mongoose";

const UserSchema = new Schema({
  userId: {
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
  email: {
    type: String,
  },
  mobileNumber: {
    type: Number,
  },
  pincode: {
    type: Number,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
});

const UserModel = model("User", UserSchema);
export default UserModel;
