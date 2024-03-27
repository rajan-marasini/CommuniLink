import { fetchOneUser } from "@/api/user.api";
import { userSelector } from "@/features/userSlice";
import { UserType } from "@/types/types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { ProfileModalTrigger } from "../Profile/ProfileModalTrigger";
import ShowFollowerCard from "../Profile/ShowFollowerCard";
import ShowFollowingCard from "../Profile/ShowFollowingCard";

const ProfileCard = () => {
    const { pathname } = useLocation();
    const user = useSelector(userSelector);

    const [newuser, setNewUser] = useState<UserType | null>(null);

    const id = pathname.split("/")[pathname.split("/").length - 1] || user?.id;

    const isPersonalProfile = id === user?.id;

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchOneUser(id!);
            setNewUser(data.user);
        };
        fetchData();
    }, [id]);

    return (
        <div className="ProfileCard rounded-3xl flex flex-col gap-4 bg-cardColor dark:bg-darkCardColor pb-1 relative">
            <div className="ProfileImages relative flex flex-col items-center justify-center">
                <img src="/img/cover.jpg" alt="" className="w-full h-48" />
                <img
                    src="/img/img1.png"
                    alt=""
                    className="w-28 rounded-full absolute -bottom-12 shadow-md shadow-profileShadow"
                />
            </div>

            <div className="ProfileName flex flex-col items-center mt-12 gap-2">
                <span className="font-extrabold">
                    {isPersonalProfile ? user?.name : newuser?.name}
                </span>
                <span>
                    {isPersonalProfile ? user?.jobTitle : newuser?.jobTitle}
                </span>
            </div>
            {isPersonalProfile ? (
                <div className="absolute bottom-28 right-24">
                    <ProfileModalTrigger />
                </div>
            ) : (
                <div className="absolute bottom-28 right-24">
                    <button className="button px-8 py-2">Follow</button>
                </div>
            )}

            <div className="followStatus flex flex-col items-center justify-center gap-3">
                <hr className="w-4/5 border border-hrColor" />
                <div className="flex gap-4 w-4/5 justify-around items-center">
                    <div className="follow flex flex-col gap-2 items-center justify-center">
                        <span className="font-bold">
                            {isPersonalProfile
                                ? user?.following.length
                                : newuser?.following.length}
                        </span>
                        <span className="dark:text-white text-gray text-sm">
                            <ShowFollowingCard />
                        </span>
                    </div>
                    <div className="vl h-[150%] border-l-2 border-hrColor"></div>
                    <div className="follow flex flex-col gap-2 items-center justify-center">
                        <span className="font-bold">
                            {isPersonalProfile
                                ? user?.followers.length
                                : newuser?.followers.length}
                        </span>
                        <span className="dark:text-white text-gray text-sm">
                            <ShowFollowerCard />
                        </span>
                    </div>
                    <>
                        <div className="vl h-[150%] border-l-2 border-hrColor"></div>
                        <div className="follow flex flex-col gap-2 items-center justify-center">
                            <span className="font-bold">
                                {newuser?.posts?.length ?? "0"}
                            </span>
                            <span className="dark:text-white text-gray text-sm">
                                Posts
                            </span>
                        </div>
                    </>
                </div>
                <hr className="w-4/5 border border-hrColor" />
            </div>
        </div>
    );
};

export default ProfileCard;
