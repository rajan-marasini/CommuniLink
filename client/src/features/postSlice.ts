import { RootState } from "@/app/store";
import { createSlice } from "@reduxjs/toolkit";
import { PostType } from "../interfaces/types";

interface PostState {
    posts: PostType[];
}
const initialState: PostState = {
    posts: [],
};

export const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload;
        },
        addPost: (state, action) => {
            state.posts = [action.payload, ...state.posts];
        },
        likeAPostStateUpdate: (state, action) => {
            const { postId, userId } = action.payload;
            const post = state.posts.find((post) => post._id === postId);

            const index = post?.likedBy?.indexOf(userId);

            if (index === -1) {
                post?.likedBy?.push(userId);
            } else {
                post?.likedBy?.splice(index!, 1);
            }
        },
        commentOnAPostStateUpdate: (state, action) => {
            const { postId, comment } = action.payload;
            const post = state.posts.find((post) => post._id === postId);
            post?.comments?.push(comment);
        },
    },
});

export const {
    setPosts,
    addPost,
    likeAPostStateUpdate,
    commentOnAPostStateUpdate,
} = postSlice.actions;
export const postSelector = (state: RootState) => state.post.posts;
export default postSlice.reducer;
