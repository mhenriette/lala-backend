import { NextFunction, Request, Response } from "express";

interface AuthRequest extends Request {
  user?: any;
}

export async function isRenter(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  if (req.user.role === "RENTER") {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}
