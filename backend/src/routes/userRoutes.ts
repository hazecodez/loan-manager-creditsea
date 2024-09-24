import express from "express";
import {
  applyingLoan,
  dashboard,
  login,
  registration,
} from "../controllers/userController";
import { userProtect } from "../middlewares/userAuth";

const router = express.Router();

router.post("/register", registration);
router.post("/login", login);
router.get("/dashboard", userProtect, dashboard);
router.post("/apply-loan", userProtect, applyingLoan);

export default router;
