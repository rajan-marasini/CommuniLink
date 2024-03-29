import { getAllPost, getAllPostOfUser } from "@/api/post.api";
import { postSelector, setPosts } from "@/features/postSlice";
import { userSelector } from "@/features/userSlice";
import { PostType } from "@/types/types";
import axios from "axios";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Post from "./Post";

const Posts = () => {
    const dispatch = useDispatch();
    const posts = useSelector(postSelector);
    const user = useSelector(userSelector);

    const [isLoading, setIsLoading] = useState(false);
    const { pathname } = useLocation();

    const id = pathname.split("/")[pathname.split("/").length - 1];

    useEffect(() => {
        const fetchData = async () => {
            if (!user?.id) return;
            setIsLoading(true);
            try {
                const data =
                    pathname === "/"
                        ? await getAllPost()
                        : await getAllPostOfUser(id);

                dispatch(setPosts(data.posts));
            } catch (error) {
                console.log(error);
                if (axios.isAxiosError(error) && error.response)
                    toast.error(error.response.data.message);
                else toast.error("Something went wrong");
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [id, pathname, user?.id, dispatch]);

    return !isLoading ? (
        posts.length === 0 ? (
            <div className="w-full flex justify-center items-center mt-11">
                No Post to display
            </div>
        ) : (
            <div className="PostSide w-full flex flex-col gap-4 mt-4">
                <div className="Posts flex flex-col gap-4">
                    {posts.map((post: PostType, id: number) => (
                        <Post post={post} key={id} />
                    ))}
                </div>
            </div>
        )
    ) : (
        <div className="flex items-center justify-center h-24">
            <Loader className="animate-spin" />
        </div>
    );
};

export default Posts;
