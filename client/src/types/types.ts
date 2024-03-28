export type UserType = {
    id: string;
    name: string;
    email: string;
    password?: string;
    profileImage?: string;
    coverImage?: string;
    jobTitle?: string;
    relationStatus?: string;
    worksAt?: string;
    address?: Address;
    following: string[];
    followers: string[];
    createdAt: Date;
    updatedAt: Date;
    posts?: PostType[];
    notifications?: NotificationType[];
};

export type NotificationType = {
    id?: string;
    message?: string;
    senderId?: string;
    revceiverId?: string;
    read?: boolean;
    user?: UserType;
};

export type Address = {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
};

export type PostType = {
    id: string;
    title?: string;
    imageSrc?: string;
    likedBy?: string[];
    user?: UserType;
    comments?: CommentType[];
};

export type CommentType = {
    id: string;
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
