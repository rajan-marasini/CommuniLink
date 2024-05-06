import { Comment } from "../models/comment.model";
import { Post } from "../models/post.model";

export class CommentServices {
    static async createComment(
        userId: string,
        postId: string,
        content: string
    ) {
        const comment = await Comment.create({
            userId,
            postId,
            content,
        });

        const post = await Post.findById(postId);
        post?.comments.push(comment._id);
        await post?.save();

        return comment;
    }

    static async getComment(commentId: string) {
        return "Comment fetched successfully";
    }

    static async getAllCommentsOfPost(postId: string) {
        return "All comments fetched successfully";
    }

    static async updateComment(
        commentId: string,
        comment: { content: string }
    ) {
        return "Comment updated successfully";
    }

    static async deleteComment(commentId: string) {
        return "Comment deleted successfully";
    }
}
