"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const userAuth_1 = require("../middlewares/userAuth");
const router = express_1.default.Router();
router.post("/register", userController_1.registration);
router.post("/login", userController_1.login);
router.get("/dashboard", userAuth_1.userProtect, userController_1.dashboard);
router.post("/apply-loan", userAuth_1.userProtect, userController_1.applyingLoan);
exports.default = router;
