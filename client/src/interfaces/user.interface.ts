import { NotificationType, PostType } from "./types";

export interface UserType {
    _id: string;
    name: string;
    email: string;
    accountType: string;
    profileImage?: string;
    coverImage?: string;
    jobTitle?: string;
    relationStatus?: string;
    worksAt?: string;
    address?: string;
    following: string[];
    followers: string[];
    createdAt: Date;
    updatedAt: Date;
    posts: string[] | PostType[];
    notifications?: string[] | NotificationType[];
}
