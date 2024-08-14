import { Router } from "express";
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
export default router;
