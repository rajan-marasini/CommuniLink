import express from "express";
import {
    createPost,
    deletePost,
    getAPost,
    getAllPost,
    getAllPostOfUser,
    likeAPost,
} from "../controllers/postController";
import { isSignedIn } from "../middleware/userMiddleware";

const router = express.Router();

router.post("/create", isSignedIn, createPost);
router.delete("/delete/:postId", isSignedIn, deletePost);
router.get("/get-all-posts", getAllPost);
router.get("/get-post-of/:userId", isSignedIn, getAllPostOfUser);
router.post("/like/:id", isSignedIn, likeAPost);
router.get("/get/:postId", isSignedIn, getAPost);

export { router as postRoute };
