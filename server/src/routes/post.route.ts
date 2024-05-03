import express from "express";
import {
    createPost,
    deletePost,
    getAllPosts,
    getAllPostsOfUser,
    getPost,
    likePost,
    updatePost,
} from "../controllers/post.controller";
import { isAuthorized } from "../middlewares/auth.middleware";
import { Post } from "../models/post.model";

const router = express.Router();

router.post("/create", isAuthorized, createPost);
router.get("/all-posts", getAllPosts);
router.get("/get-post-of/:userId", getAllPostsOfUser);
router.post("/like/:postId", isAuthorized, likePost);
router.get("/delete", async (req, res) => {
    await Post.deleteMany();
    res.send("ok");
});
router
    .route("/:postId")
    .get(getPost)
    .put(isAuthorized, updatePost)
    .delete(isAuthorized, deletePost);

export default router;
