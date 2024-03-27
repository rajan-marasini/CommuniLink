import FollowersCardSection from "../Homepage/FollowerCardSection";
import LogoSearch from "../LogoSeach";
import InfoCard from "./InfoCard";

const ProfileLeft = () => {
    return (
        <div className="ProfileLeft flex flex-col gap-4 items-center  px-4 sticky ">
            <LogoSearch />
            <InfoCard />
            <FollowersCardSection title="People you may know" />
        </div>
    );
};

export default ProfileLeft;
