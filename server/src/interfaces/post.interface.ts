import { Document } from "mongoose";
import { UserType } from "./user.interface";

export interface PostType extends Document {
    title: string;
    imageSrc?: string;
    userId: string | UserType;
    likedBy: string[];
    comments: string[];
}
