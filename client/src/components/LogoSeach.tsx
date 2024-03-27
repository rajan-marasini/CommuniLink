import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const LogoSeach = () => {
    return (
        <div className="LogoSearch flex gap-3">
            <Link to={"/"} className="h-12 w-12">
                <img
                    src="/img/logo_alt.png"
                    alt=""
                    className="h-full w-full object-contain"
                />
            </Link>
            <div className="Search flex dark:bg-darkInputColor bg-inputColor rounded-xl items-center">
                <input
                    type="text"
                    placeholder="#Explore"
                    className="bg-transparent border-none outline-none px-2"
                />
                <div className="flex items-center justify-center rounded-md text-white bg-[#00f] p-2 hover:cursor-pointer h-full px-3">
                    <FaSearch />
                </div>
            </div>
        </div>
    );
};

export default LogoSeach;
