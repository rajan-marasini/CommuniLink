import { loginWithGoogle } from "@/api/user.api";
import { app } from "@/config/firebase";
import { setUser } from "@/features/userSlice";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

interface GoogleLoginButtonProps {
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const GoogleLoginButton = ({
    isLoading,
    setIsLoading,
}: GoogleLoginButtonProps) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleGoogleLogin = async () => {
        try {
            setIsLoading(true);
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const { user } = await signInWithPopup(auth, provider);

            const data = await loginWithGoogle(
                user.displayName,
                user.email,
                user.photoURL
            );

            if (data.success) {
                dispatch(setUser(data.user));
                navigate("/");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            className=" infoButton w-full h-12 disabled:cursor-not-allowed disabled:opacity-75 flex items-center justify-center gap-2 bg-red-600 rounded-lg"
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
        >
            <FaGoogle /> <span>Continue with Google</span>
        </button>
    );
};

export default GoogleLoginButton;
