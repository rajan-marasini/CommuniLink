import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { handleError } from "./middlewares/error.handler";
import authRoute from "./routes/auth.route";
import commentRoute from "./routes/comment.route";
import imageRoute from "./routes/image.route";
import postRoute from "./routes/post.route";
import userRoute from "./routes/user.route";
import { connectDB } from "./utils/connectDB";

dotenv.config();
connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: ["http://localhost:5173"],
        credentials: true,
    })
);
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.send("Hello World");
});

//middleware
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/image", imageRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/comment", commentRoute);
app.use(handleError);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
