import { register } from "@/api/user.api";
import { userSelector } from "@/features/userSlice";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import GoogleLogin from "./GoogleLoginButton";

const SignUp = () => {
    const user = useSelector(userSelector);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (password !== confirmPassword)
                return toast.error("Password does not match");

            const data = await register({
                name: firstName + " " + lastName,
                email,
                password,
            });

            if (data.success) {
                toast.success(data.message);
                navigate("/auth/login");
            }
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
                className="infoForm authForm dark:bg-darkCardColor bg-cardColor h-full w-full px-4 flex flex-col gap-4 py-4 rounded-2xl drop-shadow-lg"
                onSubmit={handleSubmit}
            >
                <h3 className="font-bold w-full text-3xl ml-4 ">Sign up</h3>

                <div className="w-full flex items-center justify-center gap-4">
                    <input
                        disabled={isLoading}
                        type="text"
                        placeholder="First Name"
                        className="infoInput"
                        name="firstname"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <input
                        disabled={isLoading}
                        type="text"
                        placeholder="Last Name"
                        className="infoInput"
                        name="lastname"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>

                <div className="w-full items-center justify-center">
                    <input
                        disabled={isLoading}
                        type="text"
                        className="infoInput"
                        name="email"
                        placeholder="your@email.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="w-full flex items-center justify-center gap-4">
                    <input
                        disabled={isLoading}
                        type="password"
                        placeholder="Password"
                        className="infoInput"
                        name="Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        disabled={isLoading}
                        type="password"
                        placeholder="Confirm Password"
                        className="infoInput"
                        name="Password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                <div className="dark:text-white text-gray">
                    <span style={{ fontSize: "12px" }}>
                        Already have an account.{" "}
                        <Link
                            to={"/auth/login"}
                            className="hover:underline cursor-pointer"
                        >
                            Login
                        </Link>
                    </span>
                </div>
                <button
                    className="button infoButton w-full h-12 self-end disabled:cursor-not-allowed disabled:opacity-75"
                    type="submit"
                    disabled={isLoading}
                >
                    Signup
                </button>
                <GoogleLogin
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                />
            </form>
        </div>
    ) : (
        <Navigate to="/" />
    );
};

export default SignUp;
