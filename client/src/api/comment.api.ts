import axios from "axios";

export const commentOnAPost = async (postId: string, content: string) => {
    const res = await axios.post("/api/v1/comment/create", { postId, content });
    return res.data;
};
