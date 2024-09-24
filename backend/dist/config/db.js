"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = () => {
    try {
        const MongoUri = process.env.MONGO_URI;
        mongoose_1.default
            .connect(MongoUri)
            .then(() => {
            console.log("Database connected");
        })
            .catch((err) => console.log("DB connection error:", err));
    }
    catch (error) {
        console.log(error);
    }
};
exports.connectDB = connectDB;
