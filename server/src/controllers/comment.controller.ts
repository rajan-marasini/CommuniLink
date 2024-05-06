import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../interfaces/error.interface";
import { CommentServices } from "../services/comment.services";

export class CommentController {
    public createComment = TryCatch(
        async (req: Request, res: Response, next: NextFunction) => {
            const { content, postId } = req.body;
            const userId = req.user?._id;

            const comment = await CommentServices.createComment(
                userId,
                postId,
                content
            );

            res.status(201).json({
                success: true,
                message: "Comment created successfully",
                comment,
            });
        }
    );
}
