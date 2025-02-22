import { NextFunction, Request, Response } from "express";

interface AuthRequest extends Request {
    user?: any;
}

export async function isHost(req: AuthRequest, res: Response, next: NextFunction) {
    if (req.user.role === "HOST") {
        next();
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
}