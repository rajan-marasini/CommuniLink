import { IoIosHome } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";
import { MdMessage, MdNotifications } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { ModeToggle } from "./utils/mode-toggle";

const NavBar = () => {
    const { pathname } = useLocation();

    const homepage =
        pathname === "/" ||
        pathname.startsWith("/profile/") ||
        pathname === "/post/";

    return (
        <div className="navIcons mt-4 flex items-center justify-between w-full">
            <Link to={"/"}>
                <IoIosHome size={30} fill={homepage ? "#00f" : ""} />
            </Link>
            <Link to={"/setting"}>
                <IoSettingsSharp
                    size={24}
                    fill={pathname === "/setting" ? "#00f" : ""}
                />
            </Link>
            <Link to={"/notification"} className="relative">
                <span className="absolute -right-1 -top-3 font-bold text-lg dark:text-white text-blue-700">
                    {/* {user?.notifications?.length} */}
                    {5}
                </span>
                <MdNotifications
                    size={30}
                    fill={pathname === "/notification" ? "#00f" : ""}
                />
            </Link>
            <Link to={"/message"}>
                <MdMessage size={24} />
            </Link>
            <ModeToggle />
        </div>
    );
};

export default NavBar;
