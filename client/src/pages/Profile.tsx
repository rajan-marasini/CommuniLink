import PostShare from "@/components/Homepage/PostShare";
import Posts from "@/components/Homepage/Posts";
import { userSelector } from "@/features/userSlice";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import ProfileCard from "../components/Homepage/ProfileCard";
import ProfileLeft from "../components/Profile/ProfileLeft";
import RightSide from "../components/RightSide";

const Profile = () => {
    const { pathname } = useLocation();
    const user = useSelector(userSelector);

    const userId = pathname.split("/")[pathname.split("/").length - 1];

    return user ? (
        <div className="Profile mt-4">
            <ProfileLeft />
            <div className="Profile-center flex flex-col gap-4 max-h-screen overflow-auto">
                <ProfileCard />
                {userId === user._id && <PostShare />}
                <Posts />
            </div>
            <RightSide />
        </div>
    ) : (
        <Navigate to={"/auth/login"} />
    );
};

export default Profile;
