import { commentOnAPost } from "@/api/comment.api";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { commentOnAPostStateUpdate } from "@/features/postSlice";
import { MessageCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

export default function CommentModelTrigger({ postId }: { postId: string }) {
    const dispatch = useDispatch();
    const [comment, setComment] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleComment = async (
        e: React.FormEvent<HTMLFormElement>,
        postId: string
    ) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (!comment) return toast.error("Comment cannot be empty");

            const data = await commentOnAPost(postId, comment);
            dispatch(
                commentOnAPostStateUpdate({ postId, comment: data.comment })
            );
            if (data.success) {
                toast.success("Comment successful");

                setComment("");
            }
        } catch (error) {
            console.log(error);
            toast.error("Error while commenting");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <MessageCircle size={30} className="cursor-pointer" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Comment</DialogTitle>
                </DialogHeader>
                <form
                    className="flex items-center space-x-2 w-96"
                    onSubmit={(e) => handleComment(e, postId)}
                >
                    <div className="grid flex-1 gap-2">
                        <Input
                            placeholder="Enter a comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
