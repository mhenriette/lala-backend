import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
    user?: any;
    }

export async function isLoggedIn(req: AuthRequest, res: Response, next: NextFunction): Promise<any> {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET!);

  if (!decoded) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  req.user = decoded;
//   next();
// return res.end();
next();
}
