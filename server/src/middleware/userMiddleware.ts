import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserService } from "../services/userServices";
import { ErrorHandler } from "../utils/utilityClasses";
import { TryCatch } from "./errorHandling";

declare global {
    namespace Express {
        interface Request {
            user?: User | null;
        }
    }
}

export const isSignedIn = TryCatch(
    async (req: Request, res: Response, next: NextFunction) => {
        const { token } = req.cookies;
        if (!token) return next(new ErrorHandler("Unauthorized Access", 401));

        const { id } = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

        const user = await UserService.getAUserById(id);

        if (!user) return next(new ErrorHandler("User not found", 500));

        (req as any).user = user;

        next();
    }
);
