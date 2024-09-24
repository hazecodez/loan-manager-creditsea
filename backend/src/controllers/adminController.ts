import { Request, Response } from "express";
import { AdminModel } from "../models/adminModel";
import { passwordComparing } from "../utils/encryption";
import { generateJWTtoken } from "../utils/jwt";
import { LoanModel } from "../models/loanModel";
import { UserModel } from "../models/userModel";

export const loginAdmin = async (req: Request, res: Response) => {
  const { name, password } = req.body;
  try {
    const exist = await AdminModel.findOne({ name });
    if (!exist) {
      return res.json({ message: "Admin not found" }).status(400);
    }
    const isMatch = await passwordComparing(password, exist.password);
    if (!isMatch) {
      return res.json({ message: "Incorrect password" }).status(400);
    }
    const token = generateJWTtoken(exist._id as string, "admin");
    return res.status(200).json({ token, message: "Successfully logged" });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

export const dashboard = async (req: Request, res: Response) => {
  try {
    const loans = await LoanModel.find();
    const users = await UserModel.find();
    return res.status(200).json({ loans, users });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

export const loanApproval = async (req: Request, res: Response) => {
  const { id, status } = req.body;
  try {
    await LoanModel.findOneAndUpdate(
      { _id: id },
      { status: status },
      { new: true }
    );
    return res.status(200).json({ message: "Loan status updated." });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};
