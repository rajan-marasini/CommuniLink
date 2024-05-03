import mongoose from "mongoose";

export const connectDB = () =>
    mongoose
        .connect(process.env.DATABASE_URL!)
        .then((conn) => {
            console.log(
                "Database connected successfully",
                conn.connection.host
            );
        })
        .catch((error) => {
            console.log("Database connection failed", error.message);
        });
