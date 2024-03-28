import { createPost } from "@/api/post.api";
import { addPost } from "@/features/postSlice";
import { userSelector } from "@/features/userSlice";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaPlayCircle } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { GrFormSchedule } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoMdPhotos } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import AvatarDemo from "../Avatar";

const PostShare = () => {
    const user = useSelector(userSelector);
    const dispatch = useDispatch();
    const imageRef = useRef<HTMLInputElement | null>(null);

    const [image, setImage] = useState<File | null>(null);
    const [title, setTitle] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handlePost = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        if (!title) {
            toast.error("Title is required to post");
            return;
        }

        toast.success("Posting...");
        try {
            const data = await createPost(title, image as File);
            if (data.success) {
                dispatch(addPost(data.post));
                toast.success("Posted");
                setTitle("");
                setImage(null);
            } else {
                toast.error("Posting Failed");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="PostShare flex gap-4 dark:bg-darkCardColor bg-cardColor p-4 rounded-2xl ">
            <AvatarDemo imageUrl={user?.profileImage} />

            <form
                className="flex flex-col w-11/12"
                onSubmit={handlePost}
                encType="multipart-form/data"
            >
                <input
                    type="text"
                    placeholder="What's happening"
                    className="bg-inputColor dark:bg-darkInputColor rounded-xl py-2 px-3 text-lg border-none outline-none"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <div className="postOptions flex justify-around mt-4">
                    <div
                        className="option p-1 pl-2.5 pr-2.5 rounded-lg flex items-center justify-center text-xs hover:cursor-pointer gap-1 text-photo"
                        onClick={() => imageRef.current?.click()}
                    >
                        <IoMdPhotos size={20} />
                        <span className="font-medium hidden sm:inline-block">
                            Photos
                        </span>
                    </div>
                    <div className="option p-1 pl-2.5 pr-2.5 rounded-lg flex items-center justify-center text-xs hover:cursor-pointer gap-1 text-video">
                        <FaPlayCircle size={20} />
                        <span className="font-medium hidden sm:inline-block">
                            Videos
                        </span>
                    </div>
                    <div className="option p-1 pl-2.5 pr-2.5 rounded-lg flex items-center justify-center text-xs hover:cursor-pointer gap-1 text-location">
                        <FaLocationDot size={20} />
                        <span className="font-medium hidden sm:inline-block">
                            Location
                        </span>
                    </div>
                    <div className="option p-1 pl-2.5 pr-2.5 rounded-lg flex items-center justify-center text-xs hover:cursor-pointer gap-1 text-schedule">
                        <GrFormSchedule size={20} />
                        <span className="font-medium hidden sm:inline-block">
                            Schedule
                        </span>
                    </div>
                    <button
                        className="button px-5 py-1"
                        type="submit"
                        disabled={isLoading}
                    >
                        Share
                    </button>
                    <div className="hidden">
                        <input
                            type="file"
                            name="myImage"
                            accept="image/*"
                            ref={imageRef}
                            onChange={(e) =>
                                setImage(e.target.files?.[0] as File)
                            }
                        />
                    </div>
                </div>

                {image && (
                    <div className="previewImage relative">
                        <ImCross
                            onClick={() => setImage(null)}
                            className="absolute right-4 top-4 cursor-pointer"
                        />
                        <img
                            src={URL.createObjectURL(image as File)}
                            className="w-full max-h-80 object-contain rounded-lg mt-2 -left-2"
                        />
                    </div>
                )}
            </form>
        </div>
    );
};

export default PostShare;
