import { faker } from "@faker-js/faker";
import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../interfaces/error.interface";
import { User } from "../models/user.model";
import UserServices from "../services/user.services";
import { hashPassword } from "../utils/bcrypt";

export class UserController {
    public userProfile = TryCatch(
        async (req: Request, res: Response, next: NextFunction) => {
            const user = req.user;

            return res.status(200).json({
                user,
            });
        }
    );

    public followUser = TryCatch(
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

    public getAllUsers = TryCatch(
        async (req: Request, res: Response, next: NextFunction) => {
            const userId = req.user?._id;
            const users = await UserServices.getAllUsers(userId);
            return res.status(200).json({
                users,
            });
        }
    );

    public getUser = TryCatch(
        async (req: Request, res: Response, next: NextFunction) => {
            const { userId } = req.params;
            const user = await UserServices.findUserById(userId);

            return res.status(200).json({
                user,
            });
        }
    );

    public updateUser = TryCatch(
        async (req: Request, res: Response, next: NextFunction) => {}
    );

    public deleteUser = TryCatch(
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

    public getFollowers = TryCatch(
        async (req: Request, res: Response, next: NextFunction) => {
            const { userId } = req.params;
            const followers = await UserServices.getFollowers(userId);

            return res.status(200).json({
                _count: followers?.length,
                followers,
            });
        }
    );

    public getFollowing = TryCatch(
        async (req: Request, res: Response, next: NextFunction) => {
            const { userId } = req.params;
            const following = await UserServices.getFollowing(userId);

            return res.status(200).json({
                _count: following?.length,
                following,
            });
        }
    );
    public insertFakeUsers = TryCatch(
        async (req: Request, res: Response, next: NextFunction) => {
            let count = 0;
            for (let i = 0; i < 10; i++) {
                await User.create({
                    name: faker.person.fullName(),
                    email: faker.internet.email(),
                    password: await hashPassword("password"),
                    profileImage: faker.image.avatar(),
                });
                count++;
            }
            return res.json(`Created ${count} users`);
        }
    );
}
