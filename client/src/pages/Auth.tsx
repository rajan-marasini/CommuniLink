import { userSelector } from "@/features/userSlice";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Logo from "/img/logo_alt.png";

const Auth = () => {
    const user = useSelector(userSelector);
    return !user ? (
        <div className="Auth flex items-center justify-center h-screen gap-16 relative">
            <div className="a-left flex items-center justify-center gap-8">
                <img src={Logo} alt="" className="w-16 h-16" />
                <div className="Webname">
                    <h1 className="text-5xl bg-buttonBg bg-repeat text-[#00f] font-extrabold">
                        CommuniLink
                    </h1>
                    <h6 className="dark:text-white text-gray">
                        Explore the ideas throughout the world
                    </h6>
                </div>
            </div>

            <Outlet />
        </div>
    ) : (
        <Navigate to={"/"} />
    );
};

export default Auth;
