import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { handleError } from "./middleware/errorHandling";
import { commentRoute } from "./routes/commentRoute";
import { imageRoute } from "./routes/imageRoute";
import { postRoute } from "./routes/postRoute";
import { userRoute } from "./routes/userRoute";

dotenv.config();

const app = express();

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: ["http://localhost:5173"],
        credentials: true,
    })
);
app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.send("<h1>API Index Page</h1>");
});

//user defined api middleware
app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/image", imageRoute);
app.use("/api/v1/comment", commentRoute);
app.use(handleError);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
