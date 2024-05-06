import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import express from "express";
import { UserController } from "../controllers/user.controller";
import { TryCatch } from "../interfaces/error.interface";
import { isAuthorized } from "../middlewares/auth.middleware";
import { User } from "../models/user.model";

const router = express.Router();
const userController = new UserController();

router.get("/profile", isAuthorized, userController.userProfile);
router.post("/follow/:targetUserId", isAuthorized, userController.followUser);
router.get("/all-users", isAuthorized, userController.getAllUsers);
router.get("/followers/:userId", isAuthorized, userController.getFollowers);
router.get("/following/:userId", isAuthorized, userController.getFollowing);

router.get(
    "/fake",
    TryCatch(async (req, res) => {
        let count = 0;
        for (let i = 0; i < 10; i++) {
            await User.create({
                name: faker.person.fullName(),
                email: faker.internet.email(),
                password: bcrypt.hashSync("password", 10),
                profileImage: faker.image.avatar(),
            });
            count++;
        }
        res.send(`Created ${count} users`);
    })
);

router.get("/delete", async (req, res) => {
    await User.deleteMany();
    res.send("ok");
});
router
    .route("/:userId")
    .get(userController.getUser)
    .put(isAuthorized, userController.updateUser)
    .delete(isAuthorized, userController.deleteUser);
export default router;
