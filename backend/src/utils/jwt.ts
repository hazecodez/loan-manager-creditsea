import jwt from "jsonwebtoken";

export const generateJWTtoken = (userId: string, role: string): string => {
  const JWT_SECRET = process.env.JWT_SECRET as string;
  const payload = { userId, role };
  try {
    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: "1h",
    });
    return token;
  } catch (error) {
    console.log(error);
    throw new Error("Error : generate JWT token");
  }
};

export const verifyJWTtoken = (token: string): any => {
  const JWT_SECRET = process.env.JWT_SECRET as string;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    console.log(error);
    throw new Error("Error: verifying JWT token");
  }
};
