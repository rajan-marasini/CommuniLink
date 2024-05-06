import express from "express";
import { AuthController } from "../controllers/auth.controller";
import { isAuthorized } from "../middlewares/auth.middleware";

const router = express.Router();
const authController = new AuthController();

router.post("/register", authController.userRegister);
router.post("/login", authController.userCredentialLogin);
router.post("/google-login", authController.userGoogleLogin);
router.post("/logout", isAuthorized, authController.userLogout);

export default router;
