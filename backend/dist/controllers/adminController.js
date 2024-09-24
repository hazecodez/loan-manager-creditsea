"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loanApproval = exports.dashboard = exports.loginAdmin = void 0;
const adminModel_1 = require("../models/adminModel");
const encryption_1 = require("../utils/encryption");
const jwt_1 = require("../utils/jwt");
const loanModel_1 = require("../models/loanModel");
const userModel_1 = require("../models/userModel");
const loginAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, password } = req.body;
    try {
        const exist = yield adminModel_1.AdminModel.findOne({ name });
        if (!exist) {
            return res.json({ message: "Admin not found" }).status(400);
        }
        const isMatch = yield (0, encryption_1.passwordComparing)(password, exist.password);
        if (!isMatch) {
            return res.json({ message: "Incorrect password" }).status(400);
        }
        const token = (0, jwt_1.generateJWTtoken)(exist._id, "admin");
        return res.status(200).json({ token, message: "Successfully logged" });
    }
    catch (error) {
        console.log(error);
        return res.status(500);
    }
});
exports.loginAdmin = loginAdmin;
const dashboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loans = yield loanModel_1.LoanModel.find();
        const users = yield userModel_1.UserModel.find();
        return res.status(200).json({ loans, users });
    }
    catch (error) {
        console.log(error);
        return res.status(500);
    }
});
exports.dashboard = dashboard;
const loanApproval = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, status } = req.body;
    try {
        yield loanModel_1.LoanModel.findOneAndUpdate({ _id: id }, { status: status }, { new: true });
        return res.status(200).json({ message: "Loan status updated." });
    }
    catch (error) {
        console.log(error);
        return res.status(500);
    }
});
exports.loanApproval = loanApproval;
