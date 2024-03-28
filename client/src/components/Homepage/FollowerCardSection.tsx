import { getAllUsers } from "@/api/user.api";
import { userSelector } from "@/features/userSlice";
import { UserType } from "@/types/types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FollowerCard from "./FollowerCard";

const FollowersCardSection = ({ title }: { title: string }) => {
    const user = useSelector(userSelector);
    const [Followers, setFollowers] = useState<UserType[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllUsers();
                let filteredFollowers: UserType[] = data.users;

                if (title === "People you may know") {
                    filteredFollowers = filteredFollowers.filter(
                        (follower) => !user?.following.includes(follower.id)
                    );
                } else if (title === "Following") {
                    filteredFollowers = filteredFollowers.filter((follower) =>
                        user?.following.includes(follower.id)
                    );
                } else if (title === "Followers") {
                    filteredFollowers = filteredFollowers.filter((follower) =>
                        user?.followers.includes(follower.id)
                    );
                }

                setFollowers(filteredFollowers);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [title, user, user?.following, user?.followers]);

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
