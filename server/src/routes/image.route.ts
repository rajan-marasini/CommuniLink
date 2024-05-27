import express from "express";
import multer from "multer";
import { ImageController } from "../controllers/image.controller";

const photoMiddleware = multer({
    storage: multer.memoryStorage(),
});

const router = express.Router();
const imageController = new ImageController();

router.post(
    "/upload",
    photoMiddleware.single("photo"),
    imageController.uploadImage
);

export default router;
