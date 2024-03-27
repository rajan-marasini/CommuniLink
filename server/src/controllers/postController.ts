import { NextFunction, Request, Response } from "express";
import { prisma } from "../config/prismaConfig";
import { TryCatch } from "../middleware/errorHandling";
import { PostService } from "../services/postServices";
import { PostRequestBody } from "../types/types";
import { ErrorHandler } from "../utils/utilityClasses";

export const createPost = TryCatch(
    async (
        req: Request<{}, {}, PostRequestBody>,
        res: Response,
        next: NextFunction
    ) => {
        const { title, imageSrc } = req.body;
        const user = req.user;

        if (!title) return next(new ErrorHandler("Title is required", 400));

        const post = await PostService.createPost(title, imageSrc!, user?.id!);

        res.status(201).json({
            success: true,
            message: "Post Created Successfully",
            post,
        });
    }
);

export const getAllPost = TryCatch(
    async (req: Request, res: Response, next: NextFunction) => {
        const posts = await prisma.post.findMany({
            include: {
                user: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return res.status(200).json({
            posts,
        });
    }
);

export const deletePost = TryCatch(
    async (req: Request, res: Response, next: NextFunction) => {
        const { postId } = req.params;

        await PostService.deletePost(postId);

        return res.status(200).json({
            success: true,
            message: "Post Deleted Successfully",
        });
    }
);

export const getAPost = TryCatch(
    async (req: Request, res: Response, next: NextFunction) => {
        const { postId } = req.params;
        const post = await PostService.getAPost(postId);
        return res.status(200).json({ post });
    }
);

export const likeAPost = TryCatch(
    async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const userId = req.user?.id;

        if (!userId) return next(new ErrorHandler("UnAuthorized Access", 401));

        const post = await PostService.getAPost(id);

        const index = post?.likedBy.indexOf(userId) as number;

        index === -1
            ? post?.likedBy.push(userId)
            : post?.likedBy.splice(index, 1);

        const updatedPost = await PostService.updatePost(post);

        return res.status(200).send({
            success: true,
            message: index === -1 ? "Liked " : "Unliked",
            post: updatedPost,
        });
    }
);

export const getAllPostOfUser = TryCatch(
    async (req: Request, res: Response, next: NextFunction) => {
        const { userId } = req.params;
        const posts = await PostService.getAllPostOfUser(userId);
        return res.status(200).json({ posts });
    }
);
