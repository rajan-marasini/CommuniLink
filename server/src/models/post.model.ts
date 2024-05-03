import mongoose, { Model } from "mongoose";
import { PostType } from "../interfaces/post.interface";

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        imageSrc: String,
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        likedBy: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment",
            },
        ],
    },
    { timestamps: true }
);

export const Post: Model<PostType> = mongoose.model<PostType>(
    "Post",
    postSchema
);
