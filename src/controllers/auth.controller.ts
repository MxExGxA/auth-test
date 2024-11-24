import { Request, Response } from "express";
import { userModel } from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req: any, res: Response): Promise<any> => {
  try {
    const user = await userModel.create(req.body);

    if (!user) {
      return res.status(400).json({ error: "invalid data" });
    }

    const { password, ...data } = user.toObject();

    res.status(200).json({ message: "user created", user: data });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const user = await userModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({ error: "invalid email or password" });
    }

    const passowdMatched = await bcrypt.compare(req.body.password, user.password);
    if (!passowdMatched) {
      return res.status(400).json({ error: "invalid email or password" });
    }

    const refreshToken = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET as string, {
      expiresIn: "7d",
    });

    const accessToken = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET as string, {
      expiresIn: "15m",
    });

    const { password, ...data } = user.toObject();

    res
      .status(200)
      .cookie("echo", refreshToken, { maxAge: 1000 * 60 * 60 * 24 * 7, secure: true, httpOnly: true })
      .json({ message: "login success!", user: data, token: accessToken });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const logoutUser = async (req: Request, res: Response): Promise<any> => {
  if (!req.cookies) {
    return res.status(204).json({ error: "you are already logged out" });
  }

  res.clearCookie("echo", { secure: true, httpOnly: true }).json({ message: "logged out" });
};

export const verifyUser = async (req: Request, res: Response) => {};

export const updateUser = async (req: Request, res: Response) => {};
