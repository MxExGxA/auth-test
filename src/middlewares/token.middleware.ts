import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = async (req: any, res: Response, next: NextFunction): Promise<any> => {
  const token = req.headers.cookie?.split("=")[1];

  if (!token) {
    return res.status(400).json({ error: "no token provided" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;
    req.user = {
      id: verified.id,
      username: verified.username,
      email: verified.email,
    };

    next();
  } catch (err) {
    res.status(400).json({ error: "invalid token" });
  }
};
