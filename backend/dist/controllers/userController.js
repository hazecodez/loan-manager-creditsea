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
exports.applyingLoan = exports.dashboard = exports.login = exports.registration = void 0;
const userModel_1 = require("../models/userModel");
const encryption_1 = require("../utils/encryption");
const jwt_1 = require("../utils/jwt");
const loanModel_1 = require("../models/loanModel");
const registration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const existUser = yield userModel_1.UserModel.findOne({ email });
        if (existUser) {
            return res
                .json({ status: false, message: "User already exist." })
                .status(400);
        }
        const hashedPassword = yield (0, encryption_1.passwordHashing)(password);
        const newUser = yield userModel_1.UserModel.create({
            name,
            email,
            password: hashedPassword,
        });
        yield newUser.save();
        return res
            .status(200)
            .json({ status: true, message: "Successfully registered" });
    }
    catch (error) {
        console.log(error);
        return res.status(500);
    }
});
exports.registration = registration;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const User = yield userModel_1.UserModel.findOne({ email });
        if (!User) {
            return res.json({ message: "User not found!!" }).status(400);
        }
        const isMatch = yield (0, encryption_1.passwordComparing)(password, User.password);
        if (!isMatch) {
            return res.json({ message: "Incorrect password" }).status(400);
        }
        const token = (0, jwt_1.generateJWTtoken)(User._id, "user");
        return res.status(200).json({ token, message: "Successfully logged" });
    }
    catch (error) {
        console.log(error);
        return res.status(500);
    }
});
exports.login = login;
const dashboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    try {
        const loans = yield loanModel_1.LoanModel.find({ userId: userId });
        return res.status(200).json(loans);
    }
    catch (error) {
        console.log(error);
        return res.status(500);
    }
});
exports.dashboard = dashboard;
const applyingLoan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    try {
        const { userName, loanAmount, loanTenure, employmentStatus, employmentAddress, reason, } = req.body;
        const newLoan = yield loanModel_1.LoanModel.create({
            userId,
            userName,
            loanAmount,
            loanTenure,
            employmentAddress,
            employmentStatus,
            reason,
        });
        yield newLoan.save();
        res.status(200).json({ message: "Loan applied successfully" });
    }
    catch (error) {
        console.log(error);
        return res.status(500);
    }
});
exports.applyingLoan = applyingLoan;
