import { Router } from "express";
import {
  cancelBooking,
  createBooking,
  defaultRoute,
  getBookingForCoach,
  getBookingForUser,
  rescheduleBooking,
} from "../Controller/bookingController.js";
import {
  coachLogin,
  newCoach,
  getAllCoaches,
  getCoach,
} from "../Controller/coachController.js";
import { getUser, newUser, userLogin } from "../Controller/usersController.js";

const router = Router();

router.get("/users/:userId", getUser);
router.post("/users", newUser);
router.post("/users/login", userLogin);
router.post("/coaches", newCoach);
router.post("/coaches/login", coachLogin);
router.get("/coaches/all", getAllCoaches);
router.get("/coaches/:coachId", getCoach);
router.post("/booking/:userId/:coachId", createBooking);
router.put("/booking/:bookingId", rescheduleBooking);
router.delete("/booking/:bookingId", cancelBooking);
router.get("/coaches/booking/:coachId", getBookingForCoach);
router.get("/users/booking/:userId", getBookingForUser);
router.all("*", defaultRoute);
export default router;
