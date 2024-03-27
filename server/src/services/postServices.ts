import { prisma } from "../config/prismaConfig";

export class PostService {
    static createPost = async (
        title: string,
        imageSrc: string,
        userId: string
    ) => {
        const post = await prisma.post.create({
            data: {
                title,
                imageSrc,
                user: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });
        return post;
    };

    static getAllPostOfUser = async (userId: string) => {
        const posts = await prisma.post.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
        });
        return posts;
    };

    static getAPost = async (postId: string) => {
        const post = await prisma.post.findUnique({
            where: { id: postId },
            include: {
                user: true,
                comments: true,
            },
        });
        return post;
    };

    static deletePost = async (postId: string) => {
        await prisma.post.delete({ where: { id: postId } });
    };

    static updatePost = async (post: any) => {
        const updatedPost = await prisma.post.update({
            where: { id: post.id },
            data: {
                title: post.title,
                imageSrc: post.imageSrc,
                likedBy: post.likedBy,
            },
        });
        return updatedPost;
    };
}
