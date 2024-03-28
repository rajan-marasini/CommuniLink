import express from "express";
import { commentAComment } from "../controllers/commentController";
import { isSignedIn } from "../middleware/userMiddleware";

const router = express.Router();

router.post("/create", isSignedIn, commentAComment);

export { router as commentRoute };
