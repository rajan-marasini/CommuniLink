import { Document } from "mongoose";

export interface IComment extends Document {
    content: string;
    postId: string;
    userId: string;
}
