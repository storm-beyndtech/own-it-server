import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/userModel";
import jwt from 'jsonwebtoken';
import { z } from "zod";
import { generateEmailToken, generateLoginToken, jwtSecretKey } from "../services/token";
import { welcomeMail } from "../services/emailService";


export const register = async (req: Request, res: Response) => {
  const { email, password, accountType } = req.body;
  
	try {
    let user = await User.findOne({ email });

		if (user) return res.status(400).json({ message: "User already exists" });

		const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      email,
      password: hashedPassword,
      accountType
    });
    
    
    await user.save();
    
    const emailToken = generateEmailToken(user._id.toString(), user.email);
    const loginToken = generateLoginToken(user._id.toString(), user.accountType);
    console.log(emailToken);
    await welcomeMail(user.email, emailToken)

		res.status(201).json({
			message: "User registered successfully",
			token: loginToken,
		});
	} catch (error) {
    res.status(500).json({ message: "Registration failed", error: error instanceof Error && error.message });
	}
};

export const login = async (req: Request, res: Response) => { 
  const { email, password } = req.body;

  try {
    
  } catch (error) {
    
  }
}



export const verifyEmail = async (req: Request, res: Response) => {
  const token = req.params.token;
  
  const TokenPayload = z.object({
    _id: z.string(),
    email: z.string(),
  });

  try {
    const decoded = jwt.verify(token, jwtSecretKey);
    const validatedPayload = TokenPayload.parse(decoded);
    
    const user = await User.findById(validatedPayload._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.isEmailVerified = true;
    await user.save();

    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error verifying email' });
    console.log(error)
  }
};