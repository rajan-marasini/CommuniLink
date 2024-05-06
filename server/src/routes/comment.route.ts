import express from "express";
import { CommentController } from "../controllers/comment.controller";
import { isAuthorized } from "../middlewares/auth.middleware";

const router = express.Router();
const commentController = new CommentController();

router.post("/create", isAuthorized, commentController.createComment);

export default router;
