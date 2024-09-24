import { Request, Response } from "express";
import { UserModel } from "../models/userModel";
import { passwordComparing, passwordHashing } from "../utils/encryption";
import { generateJWTtoken } from "../utils/jwt";
import { LoanModel } from "../models/loanModel";

interface AuthRequest extends Request {
  user?: any;
}

export const registration = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const existUser = await UserModel.findOne({ email });
    if (existUser) {
      return res
        .json({ status: false, message: "User already exist." })
        .status(400);
    }
    const hashedPassword = await passwordHashing(password);
    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    return res
      .status(200)
      .json({ status: true, message: "Successfully registered" });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const User = await UserModel.findOne({ email });
    if (!User) {
      return res.json({ message: "User not found!!" }).status(400);
    }
    const isMatch = await passwordComparing(password, User.password);
    if (!isMatch) {
      return res.json({ message: "Incorrect password" }).status(400);
    }
    const token = generateJWTtoken(User._id as string, "user");
    return res.status(200).json({ token, message: "Successfully logged" });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

export const dashboard = async (req: AuthRequest, res: Response) => {
  
  
  const userId = req.user?._id;
  try {
    const loans = await LoanModel.find({ userId: userId });
    return res.status(200).json(loans);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

export const applyingLoan = async (req: AuthRequest, res: Response) => {
  const userId = req.user?._id;
  try {
    const {
      userName,
      loanAmount,
      loanTenure,
      employmentStatus,
      employmentAddress,
      reason,
    } = req.body;
    const newLoan = await LoanModel.create({
      userId,
      userName,
      loanAmount,
      loanTenure,
      employmentAddress,
      employmentStatus,
      reason,
    });

    await newLoan.save();

    res.status(200).json({ message: "Loan applied successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};
