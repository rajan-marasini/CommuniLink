import express from "express";
import { UserController } from "../controllers/user.controller";
import { isAuthorized } from "../middlewares/auth.middleware";
import { User } from "../models/user.model";

const router = express.Router();
const userController = new UserController();

router.get("/profile", isAuthorized, userController.userProfile);
router.post("/follow/:targetUserId", isAuthorized, userController.followUser);
router.get("/all-users", isAuthorized, userController.getAllUsers);
router.get("/followers/:userId", isAuthorized, userController.getFollowers);
router.get("/following/:userId", isAuthorized, userController.getFollowing);

router.put("/fake", userController.insertFakeUsers);

router.delete("/delete", async (req, res) => {
    await User.deleteMany();
    return res.json({ message: "deleted all the user in the database" });
});
router
    .route("/:userId")
    .get(userController.getUser)
    .put(isAuthorized, userController.updateUser)
    .delete(isAuthorized, userController.deleteUser);

export default router;
