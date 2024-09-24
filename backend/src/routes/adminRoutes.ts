import express from "express";
import { dashboard, loanApproval, loginAdmin } from "../controllers/adminController";
import { adminProtect } from "../middlewares/adminAuth";

const router = express.Router();

router.post("/login", loginAdmin);
router.get("/dashboard", adminProtect, dashboard);
router.put("/approve-loan", adminProtect, loanApproval);

export default router;
