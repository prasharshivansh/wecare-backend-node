import { Router } from "express";
import { getUser, newUser } from "../Controller/usersController.js";

const router = Router();

router.get("/user", getUser);
router.post("/user", newUser);

export default router;
