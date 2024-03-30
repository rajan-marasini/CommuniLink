import { prisma } from "../config/prismaConfig";

export class UserService {
    static getAUserById = async (id: string) => {
        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                profileImage: true,
                coverImage: true,
                relationStatus: true,
                jobTitle: true,
                worksAt: true,
                address: true,
                following: true,
                followers: true,
                createdAt: true,
                updatedAt: true,
                posts: true,
                notifications: true,
            },
        });
        return user;
    };

    static getAUserByEmail = async (email: string) => {
        const user = await prisma.user.findUnique({ where: { email } });
        return user;
    };

    static getAllUsers = async () => {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                profileImage: true,
                coverImage: true,
                relationStatus: true,
                worksAt: true,
                address: true,
                following: true,
                followers: true,
                createdAt: true,
                updatedAt: true,
                notifications: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return users;
    };

    static createUser = async ({
        name,
        email,
        password,
        profileImage,
    }: {
        name: string;
        email: string;
        password?: string;
        profileImage?: string;
    }) => {
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password,
                profileImage,
            },
        });
        return user;
    };

    static updateUser = async (user: any) => {
        const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: {
                name: user.name,
                email: user.email,
                profileImage: user.profileImage,
                coverImage: user.coverImage,
                relationStatus: user.relationStatus,
                worksAt: user.worksAt,
                address: user.address,
                following: user.following,
                followers: user.followers,
            },
        });
        return updatedUser;
    };
}
