import { prisma } from "../config/prismaConfig";

export class CommentServices {
    static createAComment = async (
        userId: string,
        postId: string,
        content: string
    ) => {
        const comment = await prisma.comment.create({
            data: {
                content,
                post: {
                    connect: {
                        id: postId,
                    },
                },
                user: {
                    connect: {
                        id: userId,
                    },
                },
            },
            include: {
                user: true,
                post: true,
            },
        });
        return comment;
    };
}
