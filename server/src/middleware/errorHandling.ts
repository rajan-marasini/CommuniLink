import { NextFunction, Request, Response } from "express";
import { ControllerType } from "../types/types";
import { ErrorHandler } from "../utils/utilityClasses";

export const handleError = (
    error: ErrorHandler,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    error.message ||= "Internal Server Error";
    error.statusCode ||= 500;

    res.status(error.statusCode).json({
        success: false,
        message: error.message,
    });
};

export const TryCatch =
    (func: ControllerType) =>
    (req: Request, res: Response, next: NextFunction) => {
        return Promise.resolve(func(req, res, next)).catch(next);
    };
