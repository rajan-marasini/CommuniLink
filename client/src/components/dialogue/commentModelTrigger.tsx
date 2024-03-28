import { commentOnAPost } from "@/api/comment.api";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { MessageCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CommentModelTrigger({ postId }: { postId: string }) {
    const [comment, setComment] = useState("");

    const handleComment = async (
        e: React.FormEvent<HTMLFormElement>,
        postId: string
    ) => {
        e.preventDefault();
        try {
            console.log("You are going to comment as", comment);
            const data = await commentOnAPost(postId, comment);
            console.log(data);
            if (data.success) {
                toast.success("Comment successful");
                setComment("");
            }
        } catch (error) {
            console.log(error);
            toast.error("Error while commenting");
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
                        />
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
