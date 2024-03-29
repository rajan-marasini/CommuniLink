import { login } from "@/api/user.api";
import { setUser, userSelector } from "@/features/userSlice";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector(userSelector);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (!email || !password) {
                toast.error("All Field are required");
                return;
            }
            const formValue = { email, password };
            const data = await login(formValue);
            dispatch(setUser(data.user));
            toast.success(data.message);
            navigate("/");
        } catch (error) {
            console.log(error);
            if (axios.isAxiosError(error) && error.response)
                toast.error(error.response.data.message);
            else toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return !user ? (
        <div className="a-right w-full max-w-2xl flex items-center flex-col justify-center ">
            <form
                className="infoForm authForm dark:bg-darkCardColor bg-cardColor h-full w-full max-w-md px-4 flex flex-col gap-4 py-4 rounded-2xl drop-shadow-lg"
                onSubmit={handleSubmit}
            >
                <h3 className="font-bold w-full text-3xl ml-4">Login</h3>

                <div className="w-full items-center justify-center gap-4">
                    <input
                        type="email"
                        className="infoInput"
                        name="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={isLoading}
                    />
                </div>

                <div className="w-full flex items-center justify-center gap-4">
                    <input
                        type="password"
                        placeholder="Password"
                        className="infoInput"
                        name="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={isLoading}
                    />
                </div>

                <div className="dark:text-white text-gray">
                    <span style={{ fontSize: "12px" }}>
                        Don't have an account yet?.{" "}
                        <Link
                            to={"/auth/sign-up"}
                            className="hover:underline cursor-pointer"
                        >
                            Sign Up
                        </Link>
                    </span>
                </div>
                <button
                    className="button infoButton w-36 h-12 self-end disabled:cursor-not-allowed disabled:opacity-75"
                    type="submit"
                    disabled={isLoading}
                >
                    Login
                </button>
            </form>
        </div>
    ) : (
        <Navigate to="/" />
    );
};

export default Login;
