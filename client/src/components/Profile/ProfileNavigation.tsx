import { userLogout } from "@/api/user.api";
import { logout, userSelector } from "@/features/userSlice";
import { LogOut } from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AvatarDemo from "../Avatar";

const ProfileNavigation = () => {
    const dispatch = useDispatch();
    const user = useSelector(userSelector);
    const handleLogout = async () => {
        try {
            await userLogout();
            dispatch(logout());
            toast.success("Logout successfully");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="flex bg-cardColor dark:bg-darkCardColor py-2 items-center justify-between px-2 rounded-lg">
            <Link
                to={`profile/${user?.id}`}
                className="flex gap-2 items-center flex-1"
            >
                <AvatarDemo imageUrl={user?.profileImage} />
                <div className="flex flex-col">
                    <span className="font-bold">{user?.name}</span>
                    <span className="text-gray dark:text-white">
                        @{user?.name}
                    </span>
                </div>
            </Link>
            <LogOut
                onClick={handleLogout}
                size={24}
                className="cursor-pointer"
            />
        </div>
    );
};

export default ProfileNavigation;
