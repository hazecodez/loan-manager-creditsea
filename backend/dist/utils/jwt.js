"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWTtoken = exports.generateJWTtoken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateJWTtoken = (userId, role) => {
    const JWT_SECRET = process.env.JWT_SECRET;
    const payload = { userId, role };
    try {
        const token = jsonwebtoken_1.default.sign(payload, JWT_SECRET, {
            expiresIn: "1h",
        });
        return token;
    }
    catch (error) {
        console.log(error);
        throw new Error("Error : generate JWT token");
    }
};
exports.generateJWTtoken = generateJWTtoken;
const verifyJWTtoken = (token) => {
    const JWT_SECRET = process.env.JWT_SECRET;
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        return decoded;
    }
    catch (error) {
        console.log(error);
        throw new Error("Error: verifying JWT token");
    }
};
exports.verifyJWTtoken = verifyJWTtoken;
