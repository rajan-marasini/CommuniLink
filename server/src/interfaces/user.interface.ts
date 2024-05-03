import { Document } from "mongoose";

export interface UserType extends Document {
    name: string;
    email: string;
    password: string;
    accountType: string;
    profileImage: string;
    coverImage: string;
    jobTitle: string;
    relationStatus: string;
    worksAt: string;
    address: {
        street: string;
        city: string;
        state: string;
        zip: number;
    };
    following: string[];
    followers: string[];
    posts: string[];
}

export interface UserRequestPayload {
    name: string;
    email: string;
    password: string | null;
    accountType?: string;
    profileImage: string | null;
    coverImage: string | null;
    jobTitle: string | null;
    relationStatus: string | null;
    worksAt: string | null;
    address: {
        street: string | null;
        city: string | null;
        state: string | null;
        zip: number | null;
    };
}
