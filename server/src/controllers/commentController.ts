import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middleware/errorHandling";
import { CommentServices } from "../services/commentServices";

export const commentAComment = TryCatch(
    async (req: Request, res: Response, next: NextFunction) => {
        const id = req.user?.id;
        const { postId, content } = req.body;

        const newComment = await CommentServices.createAComment(
            id!,
            postId,
            content
        );

        res.status(201).json({
            success: true,
            comment: newComment,
        });
    }
);
