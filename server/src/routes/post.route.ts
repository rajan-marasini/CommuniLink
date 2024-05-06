import express from "express";
import { PostController } from "../controllers/post.controller";
import { isAuthorized } from "../middlewares/auth.middleware";
import { Post } from "../models/post.model";

const router = express.Router();
const postController = new PostController();

router.post("/create", isAuthorized, postController.createPost);
router.get("/all-posts", postController.getAllPosts);
router.get("/get-post-of/:userId", postController.getAllPostsOfUser);
router.post("/like/:postId", isAuthorized, postController.likePost);
router.get("/delete", async (req, res) => {
    await Post.deleteMany();
    res.send("ok");
});
router
    .route("/:postId")
    .get(postController.getPost)
    .put(isAuthorized, postController.updatePost)
    .delete(isAuthorized, postController.deletePost);

export default router;
