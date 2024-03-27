import { followUser } from "@/api/user.api";
import { followaPerson, userSelector } from "@/features/userSlice";
import { UserType } from "@/types/types";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AvatarDemo from "../Avatar";

interface Props {
    follower: UserType;
}

const FollowerCard = ({ follower }: Props) => {
    const user = useSelector(userSelector);
    const dispatch = useDispatch();

    const handleFollowUser = async (userToFollow: string, name: string) => {
        try {
            //local state update
            dispatch(followaPerson({ id: userToFollow }));
            //network request

            const data = await followUser(userToFollow);

            if (data.success) {
                toast.success(`You are now ${data.message} ${name}`);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="follower flex justify-between items-center">
            <div className="flex gap-2">
                <AvatarDemo imageUrl={follower.profileImage} />
                <Link
                    to={`/profile/${follower.id}`}
                    className="name flex flex-col items-start justify-center"
                >
                    <span className="font-bold">{follower.name}</span>
                    <span>@{follower.name.replace("/s+/g", "")}</span>
                </Link>
            </div>
            <button
                className="button fc-button h-8 px-5"
                onClick={() => handleFollowUser(follower.id, follower.name)}
            >
                {user?.following?.includes(follower.id) ? "Unfollow" : "Follow"}
            </button>
        </div>
    );
};

export default FollowerCard;
