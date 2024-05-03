import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ErrorHandler, TryCatch } from "../interfaces/error.interface";
import { UserType } from "../interfaces/user.interface";
import UserServices from "../services/user.services";

declare global {
    namespace Express {
        interface Request {
            user: UserType | null;
        }
    }
}

export const isAuthorized = TryCatch(
    async (req: Request, res: Response, next: NextFunction) => {
        const { token } = req.cookies;
        if (!token)
            return next(
                new ErrorHandler("You need to login to access this route", 401)
            );

        const { id } = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

        const user = (await UserServices.findUserById(id)) as UserType;

        if (!user) return next(new ErrorHandler("User not found", 404));

        req.user = user;
        next();
    }
);
