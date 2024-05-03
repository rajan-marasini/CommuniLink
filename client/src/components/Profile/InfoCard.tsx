import { fetchOneUser, userLogout } from "@/api/user.api";
import { logout, userSelector } from "@/features/userSlice";
import { UserType } from "@/interfaces/types";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const InfoCard = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const auth = useSelector(userSelector);

    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState<UserType | null>(null);

    const id = pathname.split("/")[pathname.split("/").length - 1];

    useEffect(() => {
        const fetchUser = async () => {
            const data = await fetchOneUser(id);
            setUser(data.user);
        };
        fetchUser();
    }, [id]);

    const handleLogout = async () => {
        try {
            setIsLoading(true);
            const data = await userLogout();
            if (data.success) {
                toast.success("Logged Out successfully");
                dispatch(logout());
                navigate("/auth/login");
            } else {
                toast.error("Something went wrong");
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

    return (
        <div className="InfoCard flex flex-col gap-3 dark:bg-darkCardColor bg-cardColor p-4 rounded-2xl w-11/12">
            <div className="infoHead flex justify-between items-center">
                <h4>Extra Info</h4>
            </div>

            <div className="info">
                <span>
                    <b>Status </b>
                </span>
                <span>{user?.relationStatus}</span>
            </div>

            <div className="info">
                <span>
                    <b>Lives in </b>
                </span>
                <span>{user?.address?.city}</span>
            </div>

            <div className="info">
                <span>
                    <b>Works at </b>
                </span>
                <span>{user?.worksAt}</span>
            </div>

            {id === auth?._id && (
                <button
                    className="button w-28 h-8 mt-24 self-end"
                    onClick={handleLogout}
                    disabled={isLoading}
                >
                    Logout
                </button>
            )}
        </div>
    );
};

export default InfoCard;
