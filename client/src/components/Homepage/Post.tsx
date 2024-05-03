import { likeAPost } from "@/api/post.api";
import { likeAPostStateUpdate } from "@/features/postSlice";
import { userSelector } from "@/features/userSlice";
import { PostType } from "@/interfaces/types";
import axios from "axios";
import { Heart, Send } from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import CommentModelTrigger from "../dialogue/commentModelTrigger";

interface Props {
    post: PostType;
}

const Post = ({ post }: Props) => {
    const user = useSelector(userSelector);
    const dispatch = useDispatch();
    const handleLikeClick = async (postId: string) => {
        try {
            dispatch(likeAPostStateUpdate({ postId, userId: user?._id }));

            await likeAPost(postId);
        } catch (error) {
            console.log(error);
            if (axios.isAxiosError(error) && error.response)
                toast.error(error.response.data.message);
            else toast.error("Something went wrong");
        }
    };
    return (
        user && (
            <div className="Post flex flex-col p-4 dark:bg-darkCardColor bg-cardColor rounded-2xl gap-4">
                <img
                    src={post.imageSrc}
                    className="w-full max-h-80 object-cover rounded-lg"
                />

                <div className="postReacts flex items-start gap-6">
                    <div className="flex items-center gap-2">
                        <Heart
                            fill={
                                post.likedBy?.includes(user?._id)
                                    ? "#f42f3a"
                                    : "white"
                            }
                            className="cursor-pointer"
                            onClick={() => handleLikeClick(post._id)}
                            size={30}
                        />
                        <span className="text-xl font-bold">
                            {post.likedBy?.length ? post.likedBy?.length : ""}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <CommentModelTrigger postId={post._id} />
                        <span className="text-xl font-bold">
                            {post.comments?.length ? post.comments.length : ""}
                        </span>
                    </div>

                    <Send
                        size={32}
                        strokeWidth={2.5}
                        absoluteStrokeWidth
                        className="cursor-pointer"
                    />
                </div>

                <div className="detail">
                    <span className="font-bold">{post?.userId?.name}</span>{" "}
                    <span>{post.title}</span>
                </div>
            </div>
        )
    );
};

export default Post;
