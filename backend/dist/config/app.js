"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverCreation = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const userRoutes_1 = __importDefault(require("../routes/userRoutes"));
const adminRoutes_1 = __importDefault(require("../routes/adminRoutes"));
const cors_1 = __importDefault(require("cors"));
const serverCreation = () => {
    try {
        const app = (0, express_1.default)();
        app.use((0, cors_1.default)());
        app.use(express_1.default.json());
        app.use("/", userRoutes_1.default);
        app.use("/admin", adminRoutes_1.default);
        const server = http_1.default.createServer(app);
        return server;
    }
    catch (error) {
        console.log("server creation error:", error);
    }
};
exports.serverCreation = serverCreation;
