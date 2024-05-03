import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import express from "express";
import {
    deleteUser,
    followUser,
    getAllUsers,
    getFollowers,
    getFollowing,
    getUser,
    updateUser,
    userProfile,
} from "../controllers/user.controller";
import { TryCatch } from "../interfaces/error.interface";
import { isAuthorized } from "../middlewares/auth.middleware";
import { User } from "../models/user.model";

const router = express.Router();

router.get("/profile", isAuthorized, userProfile);
router.post("/follow/:targetUserId", isAuthorized, followUser);
router.get("/all-users", isAuthorized, getAllUsers);
router.get("/followers/:userId", isAuthorized, getFollowers);
router.get("/following/:userId", isAuthorized, getFollowing);

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
    .get(getUser)
    .put(isAuthorized, updateUser)
    .delete(isAuthorized, deleteUser);
export default router;
