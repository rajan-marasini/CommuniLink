import { likeAPost } from "@/api/post.api";
import { likeAPostStateUpdate } from "@/features/postSlice";
import { userSelector } from "@/features/userSlice";
import { PostType } from "@/types/types";
import { Heart, MessageCircle, Send } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

interface Props {
    post: PostType;
}

const Post = ({ post }: Props) => {
    const user = useSelector(userSelector);
    const dispatch = useDispatch();
    const handleLikeClick = async (postId: string) => {
        try {
            console.log("post id is", postId);
            console.log("userid is ", user?.id);
            dispatch(likeAPostStateUpdate({ postId, userId: user?.id }));

            await likeAPost(postId);
        } catch (error) {
            console.log(error);
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
                    <Heart
                        fill={
                            post.likedBy?.includes(user?.id)
                                ? "#f42f3a"
                                : "white"
                        }
                        className="cursor-pointer"
                        onClick={() => handleLikeClick(post.id)}
                        size={30}
                    />

                    <MessageCircle size={30} className="cursor-pointer" />
                    <Send
                        size={32}
                        strokeWidth={2.5}
                        absoluteStrokeWidth
                        className="cursor-pointer"
                    />
                </div>

                <span className="dark:text-white text-gray text-sm">
                    {post.likedBy?.length} likes
                </span>

                <div className="detail">
                    <span className="font-bold">{post?.user?.name}</span>{" "}
                    <span>{post.title}</span>
                </div>
            </div>
        )
    );
};

export default Post;
