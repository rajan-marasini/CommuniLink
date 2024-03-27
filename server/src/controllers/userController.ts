import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { TryCatch } from "../middleware/errorHandling";
import { UserService } from "../services/userServices";
import { UserRequestBody } from "../types/types";
import { comparePassword, hashPassword } from "../utils/bcrypt";
import { ErrorHandler } from "../utils/utilityClasses";

export const userRegister = TryCatch(
    async (
        req: Request<{}, {}, UserRequestBody>,
        res: Response,
        next: NextFunction
    ) => {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return next(new ErrorHandler("All Fields are required", 400));
        }

        const userAlreadyExists = await UserService.getAUserByEmail(email);

        if (userAlreadyExists)
            return next(new ErrorHandler("User Already Exists", 400));

        const hashedPassword = hashPassword(password);

        const user = await UserService.createUser(name, email, hashedPassword);

        res.status(201).json({
            success: true,
            message: "User Registered Successfully",
            user,
        });
    }
);

export const userLogin = TryCatch(
    async (
        req: Request<{}, {}, UserRequestBody>,
        res: Response,
        next: NextFunction
    ) => {
        const { email, password } = req.body;
        if (!email || !password)
            return next(new ErrorHandler("Provide all the fields", 400));

        const user = await UserService.getAUserByEmail(email);

        if (!user) return next(new ErrorHandler("Invalid Credentials", 400));

        const isPasswordMatched = comparePassword(password, user.password);

        if (!isPasswordMatched)
            return next(new ErrorHandler("Invalid Credentials", 400));

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
            expiresIn: "7d",
        });

        return res.status(200).cookie("token", token).json({
            success: true,
            message: "Successfully Logged In",
            user,
        });
    }
);

export const userProfile = TryCatch(
    async (req: Request, res: Response, next: NextFunction) => {
        const user = req.user;

        if (!user) return;

        res.status(200).json({
            user,
        });
    }
);

export const userLogout = TryCatch(
    async (req: Request, res: Response, next: NextFunction) => {
        req.user = null;
        return res.status(200).cookie("token", "").json({
            success: true,
            message: "Logged Out Successfully",
            user: null,
        });
    }
);

export const followUser = TryCatch(
    async (req: Request, res: Response, next: NextFunction) => {
        const user = req.user;
        const { userId } = req.params;

        const userToFollow = await UserService.getAUserById(userId);

        if (!user || !userToFollow)
            return next(new ErrorHandler("User Not Found", 404));

        const isFollowing = userToFollow.followers.includes(user?.id);

        if (isFollowing) {
            const index = userToFollow.followers.indexOf(user?.id);
            userToFollow.followers.splice(index, 1);

            const followingIndex = user?.following.indexOf(userToFollow.id);
            user?.following.splice(followingIndex, 1);
        } else {
            userToFollow.followers.push(user?.id);
            user.following.push(userToFollow.id);
        }

        const updatedUser = await UserService.updateUser(user);
        await UserService.updateUser(userToFollow);

        res.status(200).json({
            success: true,
            message: isFollowing ? "unfollowing" : "following",
            user: updatedUser,
        });
    }
);

export const getAllUsers = TryCatch(
    async (req: Request, res: Response, next: NextFunction) => {
        const userId = req?.user?.id;

        const allUsers = await UserService.getAllUsers();
        const users = allUsers.filter((user) => user.id !== userId);

        res.status(200).json({
            success: true,
            users,
        });
    }
);

export const getAUser = TryCatch(
    async (req: Request, res: Response, next: NextFunction) => {
        const { userId } = req.params;

        const user = await UserService.getAUserById(userId);

        if (!user) next(new ErrorHandler("User Not Found", 401));

        res.json({ user });
    }
);
