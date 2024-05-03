import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../interfaces/error.interface";
import { PostServices } from "../services/post.services";

export const createPost = TryCatch(
    async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.user?.id;
        const { title, imageSrc } = req.body;

        const post = await PostServices.createPost(userId, { title, imageSrc });

        return res.status(201).json({
            success: true,
            message: "Post created Successfully",
            post: await PostServices.getPost(post._id),
        });
    }
);

export const getPost = TryCatch(
    async (req: Request, res: Response, next: NextFunction) => {
        const { postId } = req.params;

        const post = await PostServices.getPost(postId);

        return res.status(200).send({
            post,
        });
    }
);

export const getAllPosts = TryCatch(
    async (req: Request, res: Response, next: NextFunction) => {
        const { limit, page } = req.query as {
            limit: string;
            page: string;
        };

        const posts = await PostServices.getAllPosts(
            parseInt(limit),
            parseInt(page)
        );
        return res.status(200).send({
            _count: posts.length,
            posts,
        });
    }
);

export const getAllPostsOfUser = TryCatch(
    async (req: Request, res: Response, next: NextFunction) => {
        const { userId } = req.params;

        const posts = await PostServices.getAllPostsOfUser(userId);

        res.status(200).send({
            posts,
        });
    }
);

export const updatePost = TryCatch(
    async (req: Request, res: Response, next: NextFunction) => {}
);

export const deletePost = TryCatch(
    async (req: Request, res: Response, next: NextFunction) => {
        const { postId } = req.params;

        const message = await PostServices.deletePost(postId);

        res.status(200).send({
            success: true,
            message,
        });
    }
);

export const likePost = TryCatch(
    async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.user?._id;
        const { postId } = req.params;

        const message = await PostServices.likePost(postId, userId);

        res.status(200).send({
            success: true,
            post: await PostServices.getPost(postId),
            message,
        });
    }
);
