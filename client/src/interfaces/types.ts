export type UserType = {
    _id: string;
    name: string;
    email: string;
    accountType?: string;
    profileImage?: string;
    coverImage?: string;
    jobTitle?: string;
    relationStatus?: string;
    worksAt?: string;
    address?: string;
    following: string[];
    followers: string[];
    createdAt: Date;
    updatedAt: Date;
    posts: string[] | PostType[];
    notifications?: NotificationType[];
};

export type NotificationType = {
    _id?: string;
    message?: string;
    senderId?: string;
    revceiverId?: string;
    read?: boolean;
    user?: UserType;
};

export type PostType = {
    _id: string;
    title?: string;
    imageSrc?: string;
    likedBy?: string[];
    userId: UserType;
    comments?: CommentType[];
};

export type CommentType = {
    _id: string;
    comment: string;
    post: PostType;
    postId: string;
    user: UserType;
    userId: string;
};

export type Error = {
    success?: boolean;
    message?: string;
};
