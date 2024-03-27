import { NextFunction, Request, Response } from "express";

export type Address = {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
};

export type PostType = {
    id: string;
    title?: string;
    user?: UserType;
    userId: string;
    imageSrc?: string;
    createdAt?: Date;
    updatedAt?: Date;
};

export type UserType = {
    id: string;
    name: string;
    email: string;
    profileImage?: string;
    coverImage?: string;
    relationStatus?: string;
    worksAt?: string;
    address?: Address;
    following: string[];
    followers: string[];
    createdAt?: Date;
    updatedAt?: Date;
    posts?: PostType[];
    notifications?: Notification[];
};

export type UserRequestBody = {
    name?: string;
    email?: string;
    password?: string;
    profileImage?: string;
    coverImage?: string;
    relationStatus?: string;
    worksAt?: string;
    address?: Address;
};

export type PostRequestBody = {
    title?: string;
    imageSrc?: string;
};

export type ControllerType = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<void | Response<any, Record<string, any>>>;
