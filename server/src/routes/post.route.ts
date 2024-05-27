import { faker } from "@faker-js/faker";
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

router.delete("/delete", async (req, res) => {
    await Post.deleteMany();
    return res.json({ message: "all post deleted" });
});
router.put("/fake", isAuthorized, async (req, res) => {
    const id = req.user?._id;
    let count = 0;
    const POST_LENGTH = 5;

    for (let i = 0; i < POST_LENGTH; i++) {
        await Post.create({
            userId: id,
            title: faker.lorem.sentence(),
            imageSrc: faker.image.url(),
        });
        count++;
    }
    return res.json({ message: `Created ${count} posts` });
});
router
    .route("/:postId")
    .get(postController.getPost)
    .put(isAuthorized, postController.updatePost)
    .delete(isAuthorized, postController.deletePost);

export default router;
