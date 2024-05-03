import colors from "colors";
import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../interfaces/error.interface";

export const handleError = (
    error: ErrorHandler,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    error.statusCode ||= 500;
    error.message ||= "Internal Server Error";

    console.log(colors.red("Error: " + error.message));

    return res.status(error.statusCode).json({
        success: false,
        message: error.message,
    });
};
