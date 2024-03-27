import express from "express";
import { isSignedIn } from "../middleware/userMiddleware";

const router = express.Router();

router.post("/send-notification/:userId", isSignedIn);

export { router as Router };
