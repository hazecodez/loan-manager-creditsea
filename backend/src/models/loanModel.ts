import { Schema, Document, model } from "mongoose";

interface ILoan extends Document {
  userId: string;
  userName: string;
  loanAmount: number;
  loanTenure: number;
  employmentStatus: string;
  employmentAddress: string;
  reason: string;
  status: string;
}

const loanSchema: Schema = new Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

export const LoanModel = model<ILoan>("loan", loanSchema);
