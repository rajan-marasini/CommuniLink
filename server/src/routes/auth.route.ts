import express from "express";
import {
    userCredentialLogin,
    userGoogleLogin,
    userLogout,
    userRegister,
} from "../controllers/auth.controller";
import { isAuthorized } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/register", userRegister);
router.post("/login", userCredentialLogin);
router.post("/google-login", userGoogleLogin);
router.post("/logout", isAuthorized, userLogout);

export default router;
