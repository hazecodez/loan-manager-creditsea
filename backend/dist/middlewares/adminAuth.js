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
exports.adminProtect = void 0;
const jwt_1 = require("../utils/jwt");
const adminProtect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let token;
        if (req.headers.authorization) {
            token = req.headers.authorization;
        }
        if (!token) {
            res
                .status(401)
                .json({ status: false, role: "admin", message: "no token found" });
        }
        else {
            const decode = (0, jwt_1.verifyJWTtoken)(token);
            if (decode && decode.role !== "admin") {
                return { status: false, message: "Can't access." };
            }
            else {
                next();
            }
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.adminProtect = adminProtect;
