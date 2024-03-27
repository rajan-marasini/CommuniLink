import PostShare from "@/components/Homepage/PostShare";
import Posts from "@/components/Homepage/Posts";
import { userSelector } from "@/features/userSlice";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import LeftSide from "../components/LeftSide";
import RightSide from "../components/RightSide";

const Home = () => {
    const user = useSelector(userSelector);

    return user ? (
        <div className="Home max-h-screen">
            <div className="">
                <LeftSide />
            </div>
            <div className=" h-full max-h-screen overflow-auto w-full">
                <PostShare />
                <Posts />
            </div>
            <div className="">
                <RightSide />
            </div>
        </div>
    ) : (
        <Navigate to="/auth/login" />
    );
};

export default Home;
