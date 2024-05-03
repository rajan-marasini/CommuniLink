import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../interfaces/error.interface";
import UserServices from "../services/user.services";

export const userProfile = TryCatch(
    async (req: Request, res: Response, next: NextFunction) => {
        const user = req.user;

        return res.status(200).json({
            user,
        });
    }
);

export const followUser = TryCatch(
    async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.user?.id;
        const { targetUserId } = req.params;

        const message = await UserServices.followUser(userId, targetUserId);

        return res.status(200).send({
            success: true,
            message,
        });
    }
);

export const getAllUsers = TryCatch(
    async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.user?._id;
        const users = await UserServices.getAllUsers(userId);
        return res.status(200).json({
            users,
        });
    }
);

export const getUser = TryCatch(
    async (req: Request, res: Response, next: NextFunction) => {
        const { userId } = req.params;
        const user = await UserServices.findUserById(userId);

        return res.status(200).json({
            user,
        });
    }
);

export const updateUser = TryCatch(
    async (req: Request, res: Response, next: NextFunction) => {}
);

export const deleteUser = TryCatch(
    async (req: Request, res: Response, next: NextFunction) => {
        const { userId } = req.params;
        const user = await UserServices.deleteUser(userId);

        res.status(204).send({
            success: true,
            message: "User deleted successfully",
            user,
        });
    }
);

export const getFollowers = TryCatch(
    async (req: Request, res: Response, next: NextFunction) => {
        const { userId } = req.params;
        const followers = await UserServices.getFollowers(userId);

        return res.status(200).json({
            _count: followers?.length,
            followers,
        });
    }
);

export const getFollowing = TryCatch(
    async (req: Request, res: Response, next: NextFunction) => {
        const { userId } = req.params;
        const following = await UserServices.getFollowing(userId);

        return res.status(200).json({
            _count: following?.length,
            following,
        });
    }
);
