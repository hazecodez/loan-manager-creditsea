import { Request, Response, NextFunction } from "express";
import { verifyJWTtoken } from "../utils/jwt";
import { UserModel } from "../models/userModel";

interface AuthRequest extends Request {
  user?: any;
}

export const userProtect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1] as string;
    }

    if (!token) {
      res
        .status(401)
        .json({ status: false, role: "user", message: "no token found" });
    } else {
      const decode = verifyJWTtoken(token);
      if (decode && decode.role !== "user") {
        return { status: false, message: "Can't access." };
      } else {
        req.user = await UserModel.findById(decode.userId).select("-password");
        next();
      }
    }
  } catch (error) {
    console.log(error);
  }
};
