import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const SignUp = () => {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        toast.success("Registered Successfully");
        console.log(firstName, lastName, email, password, confirmPassword);
    };

    return (
        <div className="a-right w-full max-w-2xl flex items-center flex-col justify-center ">
            <form
                className="infoForm authForm dark:bg-darkCardColor bg-cardColor h-full w-full px-4 flex flex-col gap-4 py-4 rounded-2xl drop-shadow-lg"
                onSubmit={handleSubmit}
            >
                <h3 className="font-bold w-full text-3xl ml-4 ">Sign up</h3>

                <div className="w-full flex items-center justify-center gap-4">
                    <input
                        type="text"
                        placeholder="First Name"
                        className="infoInput"
                        name="firstname"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <input
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
                        type="password"
                        placeholder="Password"
                        className="infoInput"
                        name="Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
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
                    className="button infoButton w-36 h-12 self-end"
                    type="submit"
                >
                    Signup
                </button>
            </form>
        </div>
    );
};

export default SignUp;
