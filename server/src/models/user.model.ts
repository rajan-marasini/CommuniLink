import mongoose, { Model, Schema } from "mongoose";
import { UserType } from "../interfaces/user.interface";

const userSchema: Schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
        },
        password: {
            type: String,
            select: false,
        },
        accountType: {
            type: String,
            enum: ["credential", "google"],
            default: "credential",
        },
        profileImage: String,
        coverImage: String,
        jobTitle: String,
        relationStatus: String,
        worksAt: String,
        address: {
            street: String,
            city: String,
            state: String,
            zip: Number,
        },
        following: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        followers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        posts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Post",
            },
        ],
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment",
            },
        ],
        notifications: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Notification",
            },
        ],
    },
    { timestamps: true }
);

export const User: Model<UserType> = mongoose.model<UserType>(
    "User",
    userSchema
);
