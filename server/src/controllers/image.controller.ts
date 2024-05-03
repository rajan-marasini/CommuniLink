import { NextFunction, Request, Response } from "express";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import { app } from "../config/firebase.config";
import { ErrorHandler, TryCatch } from "../interfaces/error.interface";

export const uploadImage = TryCatch(
    async (req: Request, res: Response, next: NextFunction) => {
        const photo = req.file;

        if (!photo) return next(new ErrorHandler("Photo is required", 400));

        const storage = getStorage(app);

        const storageRef = ref(
            storage,
            `files/${Date.now() + photo?.originalname}`
        );

        const snapshot = await uploadBytesResumable(storageRef, photo.buffer, {
            contentType: photo.mimetype,
        });
        const downloadURL = await getDownloadURL(snapshot.ref);

        return res.send({
            success: true,
            message: "file uploaded to firebase storage",
            name: photo.originalname,
            type: photo.mimetype,
            imageSrc: downloadURL,
        });
    }
);
