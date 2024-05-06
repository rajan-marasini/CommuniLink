import mongoose, { Model, Schema } from "mongoose";
import { IComment } from "../interfaces/comment.interface";

const commentSchema: Schema = new Schema(
    {
        content: {
            type: String,
            required: true,
        },
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

export const Comment: Model<IComment> = mongoose.model<IComment>(
    "Comment",
    commentSchema
);
