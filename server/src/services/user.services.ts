import { ErrorHandler } from "../interfaces/error.interface";
import { UserType } from "../interfaces/user.interface";
import { User } from "../models/user.model";

export default class UserServices {
    static findUserById = async (id: string): Promise<UserType | null> => {
        const user = (await User.findById(id)) as UserType;
        return user;
    };

    static findUserByEmail = async (email: string) => {
        const user = await User.findOne({ email }).select("+password");
        return user;
    };

    static createUser = async (data: {
        name: string;
        email: string;
        password?: string;
        profileImage?: string | null;
    }) => {
        const user = await User.create(data);
        return user;
    };

    static getAllUsers = async (userId: string) => {
        const users = await User.find().sort({ createdAt: -1 }).limit(40);
        const index = users.findIndex((user) => user._id === userId);
        users.splice(index, 1);
        return users;
    };

    static followUser = async (
        userId: string,
        targetUserId: string
    ): Promise<string> => {
        const currentUser = await this.findUserById(userId);
        const targetUser = await this.findUserById(targetUserId);

        if (!currentUser || !targetUser) {
            throw new ErrorHandler("User not found", 404);
        }

        const isAlreadyFollowing = currentUser.following.includes(targetUserId);

        if (isAlreadyFollowing) {
            const index = currentUser.following.indexOf(targetUserId);
            currentUser.following.splice(index, 1);
            const targetIndex = targetUser.followers.indexOf(userId);
            targetUser.followers.splice(targetIndex, 1);
        } else {
            currentUser.following.push(targetUserId);
            targetUser.followers.push(userId);
        }

        await currentUser.save();
        await targetUser.save();

        return isAlreadyFollowing ? `Unfollowing` : `Following`;
    };

    static getFollowers = async (userId: string) => {
        const user = await User.findById(userId).populate("followers");
        return user?.followers;
    };

    static getFollowing = async (userId: string) => {
        const user = await User.findById(userId).populate("following");
        return user?.following;
    };

    static deleteUser = async (userId: string) => {
        const user = await User.findByIdAndDelete(userId);
        return user;
    };
}
