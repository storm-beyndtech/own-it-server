import jwt from "jsonwebtoken";

export const jwtSecretKey =  process.env.JWT_PRIVATE_KEY as string;

export const generateEmailToken = (_id: string, email: string) => {
  return jwt.sign({ _id, email }, jwtSecretKey, { expiresIn: "365d" });
};

export const generateLoginToken = (_id: string, accountType: string) => {
  return jwt.sign({ _id, accountType }, jwtSecretKey, { expiresIn: "1d" });
};