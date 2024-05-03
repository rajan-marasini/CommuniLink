import {
    getAllFollowersOfAUser,
    getAllFollowingOfAUser,
    getAllUsers,
} from "@/api/user.api";
import { userSelector } from "@/features/userSlice";
import { UserType } from "@/interfaces/types";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import FollowerCard from "./FollowerCard";

const FollowersCardSection = ({ title }: { title: string }) => {
    const { pathname } = useLocation();
    const user = useSelector(userSelector);
    const [Followers, setFollowers] = useState<UserType[]>([]);

    const id = pathname.split("/")[2];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllUsers();
                let filteredFollowers: UserType[] = data.users;

                if (title === "People you may know") {
                    filteredFollowers = filteredFollowers.filter(
                        (follower) => !user?.following.includes(follower._id)
                    );
                    setFollowers(filteredFollowers);
                } else if (title === "Following") {
                    const followingUsersData = await getAllFollowingOfAUser(id);
                    setFollowers(followingUsersData.following);
                } else if (title === "Followers") {
                    const followersUsersData = await getAllFollowersOfAUser(id);
                    console.log("followers: is haha", followersUsersData);
                    setFollowers(followersUsersData.followers);
                }
            } catch (error) {
                console.log(error);
                if (axios.isAxiosError(error) && error.response)
                    toast.error(error.response.data.message);
                else toast.error("Something went wrong");
            }
        };
        fetchData();
    }, [title, user, user?.following, user?.followers, id]);

    return (
        <div className="FollowersCard w-full rounded-xl gap-4 flex flex-col text-sm mt-4">
            <h3>{title}</h3>
            {Followers.slice(0, 9).map((follower, i) => (
                <FollowerCard follower={follower} key={i} />
            ))}
        </div>
    );
};

export default FollowersCardSection;
