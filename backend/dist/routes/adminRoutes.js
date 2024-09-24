"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = require("../controllers/adminController");
const adminAuth_1 = require("../middlewares/adminAuth");
const router = express_1.default.Router();
router.post("/login", adminController_1.loginAdmin);
router.get("/dashboard", adminAuth_1.adminProtect, adminController_1.dashboard);
router.patch("/approve-loan", adminAuth_1.adminProtect, adminController_1.loanApproval);
exports.default = router;
