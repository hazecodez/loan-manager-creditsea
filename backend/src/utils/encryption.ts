import bcrypt from "bcrypt";

export const passwordHashing = async (password: string): Promise<string> => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (error) {
    throw new Error("Error hashing password");
  }
};

export const passwordComparing = async (
  userPassword: string,
  hashedPass: string
): Promise<boolean> => {
  try {
    const compared = await bcrypt.compare(userPassword, hashedPass);
    return compared;
  } catch (error) {
    throw new Error("Error comparing encrypted password");
  }
};
