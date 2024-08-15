import BookingModel from "../Models/BookingModel.js";
import CoachModel from "../Models/CoachModel.js";
import UserModel from "../Models/UserModel.js";

export async function generateUniqueUserId() {
  const generatedUserId = () =>
    "UI-" + (Math.floor(Math.random() * 9000) + 1000).toString();
  const checkIdExists = async (id) => {
    const user = await UserModel.findOne({ userId: id });
    return user !== null;
  };
  const generateUniqueIdRecursive = async () => {
    const id = generatedUserId();
    const exists = await checkIdExists(id);
    if (exists) {
      return generateUniqueIdRecursive();
    } else {
      return id;
    }
  };
  return await generateUniqueIdRecursive();
}

export async function generateUniqueCoachId() {
  const generatedCoachId = () =>
    "CI-" + (Math.floor(Math.random() * 9000) + 1000).toString();
  const checkIdExists = async (id) => {
    const coach = await CoachModel.findOne({ coachId: id });
    return coach !== null;
  };
  const generateUniqueIdRecursive = async () => {
    const id = generatedCoachId();
    const exists = await checkIdExists(id);
    if (exists) {
      return generateUniqueIdRecursive();
    } else {
      return id;
    }
  };
  return await generateUniqueIdRecursive();
}

export async function generateUniqueBookingId() {
  const generatedBookingId = () =>
    "BI-" + (Math.floor(Math.random() * 9000) + 1000).toString();
  const checkIdExists = async (id) => {
    const booking = await BookingModel.findOne({ bookingId: id });
    return booking !== null;
  };
  const generateUniqueIdRecursive = async () => {
    const id = generatedBookingId();
    const exists = await checkIdExists(id);
    if (exists) {
      return generateUniqueIdRecursive();
    } else {
      return id;
    }
  };
  return await generateUniqueIdRecursive();
}
