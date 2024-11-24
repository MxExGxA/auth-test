import { Request, Response } from "express";
import { userModel } from "../models/user.model";

export const getUserProfile = async (req: any, res: Response): Promise<any> => {
  const user = await userModel.findById(req.user.id).select("-password");

  if (!user) {
    return res.status(401).json({ message: "unauthorized" });
  }

  res.status(200).json({ user });
};
