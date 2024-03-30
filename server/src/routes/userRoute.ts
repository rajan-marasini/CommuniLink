import express from "express";
import {
    followUser,
    getAUser,
    getAllUsers,
    userGoogleLogin,
    userLogin,
    userLogout,
    userProfile,
    userRegister,
} from "../controllers/userController";
import { isSignedIn } from "../middleware/userMiddleware";

const router = express.Router();

router.post("/register", userRegister);
router.post("/login", userLogin);
router.post("/google-login", userGoogleLogin);
router.get("/profile", isSignedIn, userProfile);
router.post("/logout", isSignedIn, userLogout);
router.get("/get/:userId", isSignedIn, getAUser);
router.post("/follow/:userId", isSignedIn, followUser);
router.get("/all-users", isSignedIn, getAllUsers);

export { router as userRoute };
