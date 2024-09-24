import { Request, Response, NextFunction } from "express";
import { verifyJWTtoken } from "../utils/jwt";

export const adminProtect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token;
    if (
      req.headers.authorization 
    ) {
      token = req.headers.authorization as string;
    }
    if (!token) {
      res
        .status(401)
        .json({ status: false, role: "admin", message: "no token found" });
    } else {
      const decode = verifyJWTtoken(token);
      if (decode && decode.role !== "admin") {
        return { status: false, message: "Can't access." };
      } else {
        next();
      }
    }
  } catch (error) {
    console.log(error);
  }
};
