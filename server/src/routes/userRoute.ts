import express from "express";
import { prisma } from "../config/prismaConfig";
import {
    followUser,
    getAUser,
    getAllUsers,
    userLogin,
    userLogout,
    userProfile,
    userRegister,
} from "../controllers/userController";
import { isSignedIn } from "../middleware/userMiddleware";

const router = express.Router();

router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/profile", isSignedIn, userProfile);
router.post("/logout", isSignedIn, userLogout);
router.get("/get/:userId", isSignedIn, getAUser);
router.post("/follow/:userId", isSignedIn, followUser);
router.get("/all-users", isSignedIn, getAllUsers);
router.get("/test", isSignedIn, (req, res) => {
    res.send({ user: req.user });
});

router.get("/fake", async (req, res) => {
    const fakeUser = await prisma.user.createMany({
        data: [
            {
                name: "Jane A. Williams",
                email: "jane@gmail.com",
                password: "jane",
            },
            {
                name: "John B. Davis",
                email: "john@gmail.com",
                password: "john",
            },
            {
                name: "Alice C. Smith",
                email: "alice@gmail.com",
                password: "alice",
            },
            {
                name: "Michael D. Martinez",
                email: "michael@gmail.com",
                password: "michael",
            },
            {
                name: "Emily E. Garcia",
                email: "emily@gmail.com",
                password: "emily",
            },
            {
                name: "David F. Johnson",
                email: "david@gmail.com",
                password: "david",
            },
            {
                name: "Sophia G. Rodriguez",
                email: "sophia@gmail.com",
                password: "sophia",
            },
        ],
    });
    res.send({ message: "fake users created Successfully", fakeUser });
});

export { router as userRoute };
