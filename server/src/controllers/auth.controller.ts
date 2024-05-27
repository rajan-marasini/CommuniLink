import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ErrorHandler, TryCatch } from "../interfaces/error.interface";
import { UserRequestPayload } from "../interfaces/user.interface";
import UserServices from "../services/user.services";
import { comparePassword, hashPassword } from "../utils/bcrypt";

export class AuthController {
    public userRegister = TryCatch(
        async (req: Request, res: Response, next: NextFunction) => {
            const { name, email, password } = req.body;

            const isUserAlreadyExist = await UserServices.findUserByEmail(
                email
            );
            if (isUserAlreadyExist)
                return next(new ErrorHandler("User Already Exist", 400));

            const hashedPasswod = await hashPassword(password);

            const user = await UserServices.createUser({
                name,
                email,
                password: hashedPasswod,
            });

            return res.status(200).json({
                success: true,
                message: "User login successfully",
                user: await UserServices.findUserById(user._id as string),
            });
        }
    );

    public userCredentialLogin = TryCatch(
        async (
            req: Request<{}, {}, UserRequestPayload>,
            res: Response,
            next: NextFunction
        ) => {
            const { email, password } = req.body;
            if (!email || !password)
                return next(
                    new ErrorHandler("Please provide email and password", 400)
                );

            const user = await UserServices.findUserByEmail(email);
            if (!user) return next(new ErrorHandler("User not found", 404));

            const isPasswordMatched = await comparePassword(
                password,
                user.password as string
            );
            if (!isPasswordMatched)
                return next(new ErrorHandler("Invalid email or password", 400));

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
                expiresIn: "7d",
            });

            return res
                .status(200)
                .cookie("token", token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                })
                .json({
                    success: true,
                    message: "User login successfully",
                    user: await UserServices.findUserById(user._id as string),
                });
        }
    );

    public userGoogleLogin = TryCatch(
        async (
            req: Request<{}, {}, UserRequestPayload>,
            res: Response,
            next: NextFunction
        ) => {
            const { name, email, profileImage } = req.body;

            if (!name || !email)
                return next(new ErrorHandler("Provide all the fields", 400));

            const user = await UserServices.findUserByEmail(email);

            if (!user) {
                const newUser = await UserServices.createUser({
                    name,
                    email,
                    profileImage,
                });
                const token = jwt.sign(
                    { id: newUser.id },
                    process.env.JWT_SECRET!,
                    {
                        expiresIn: "7d",
                    }
                );
                return res
                    .status(200)
                    .cookie("token", token, {
                        httpOnly: true,
                        secure: true,
                        sameSite: "none",
                    })
                    .json({
                        success: true,
                        message: "Successfully Logged In",
                        user: newUser,
                    });
            } else {
                const token = jwt.sign(
                    { id: user.id },
                    process.env.JWT_SECRET!,
                    {
                        expiresIn: "7d",
                    }
                );
                return res
                    .status(200)
                    .cookie("token", token, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === "production",
                        sameSite: "none",
                    })
                    .json({
                        success: true,
                        message: "Successfully Logged In",
                        user,
                    });
            }
        }
    );

    userLogout = TryCatch(
        async (req: Request, res: Response, next: NextFunction) => {
            req.user = null;

            return res
                .status(200)
                .cookie("token", "", {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "none",
                    expires: new Date(0),
                })
                .json({
                    success: true,
                    message: "User logout successfully",
                    user: null,
                });
        }
    );
}
