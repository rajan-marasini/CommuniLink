import { NextFunction, Request, Response } from "express";
import { ControllerType } from "../types/controller.type";

export class ErrorHandler extends Error {
    constructor(public message: string, public statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const TryCatch =
    (func: ControllerType) =>
    (req: Request, res: Response, next: NextFunction) =>
        Promise.resolve(func(req, res, next)).catch(next);
