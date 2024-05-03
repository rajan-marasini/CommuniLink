import express from "express";
import multer from "multer";
import { uploadImage } from "../controllers/image.controller";

const photoMiddleware = multer({
    storage: multer.memoryStorage(),
});

const router = express.Router();
router.post("/upload", photoMiddleware.single("photo"), uploadImage);

export { router as imageRoute };
