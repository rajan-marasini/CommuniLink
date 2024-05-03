import { ErrorHandler } from "../interfaces/error.interface";
import { Post } from "../models/post.model";
import UserServices from "./user.services";

export class PostServices {
    static async createPost(
        userId: string,
        postBody: {
            title: string;
            imageSrc: string | null;
        }
    ) {
        const post = await Post.create({
            ...postBody,
            userId,
        });

        const user = await UserServices.findUserById(userId);
        user?.posts.push(post._id);
        await user?.save();

        return post;
    }

    static async getPost(postId: string) {
        const post = await Post.findById(postId).populate(
            "userId",
            "name email _id"
        );
        return post;
    }

    static async getAllPosts(limit = 20, page = 0) {
        const posts = await Post.find()
            .sort({ createdAt: -1 })
            .populate("userId", "_id name")
            .skip(page * limit)
            .limit(limit);
        return posts;
    }

    static async getAllPostsOfUser(userId: string) {
        const posts = await Post.find({ userId }).populate(
            "userId",
            "_id name"
        );
        return posts;
    }

    static async updatePost(
        postId: string,
        post: { title: string; imageSrc: string | null }
    ) {
        return "Post updated successfully";
    }

    static async deletePost(postId: string) {
        const post = await this.getPost(postId);
        if (!post) {
            throw new ErrorHandler("Post not found", 404);
        }
        await Post.findByIdAndDelete(postId);
        return "Post deleted successfully";
    }

    static async likePost(postId: string, userId: string) {
        const post = await this.getPost(postId);

        if (!post) {
            throw new ErrorHandler("Post not found", 404);
        }
        const isAlreadyLiked = post.likedBy.includes(userId);

        if (isAlreadyLiked) {
            const index = post.likedBy.indexOf(userId);
            post.likedBy.splice(index, 1);
        } else {
            post.likedBy.push(userId);
        }
        await post.save();
        return isAlreadyLiked ? "UnLiked" : "Liked";
    }
}
