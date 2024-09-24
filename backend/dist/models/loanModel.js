"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoanModel = void 0;
const mongoose_1 = require("mongoose");
const loanSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    loanAmount: {
        type: Number,
        required: true,
    },
    loanTenure: {
        type: Number,
        required: true,
    },
    employmentStatus: {
        type: String,
        required: true,
    },
    employmentAddress: {
        type: String,
        required: true,
    },
    reason: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: "pending",
    },
}, {
    timestamps: true,
});
exports.LoanModel = (0, mongoose_1.model)("loan", loanSchema);
