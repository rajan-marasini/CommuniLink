import FollowersCardSection from "./Homepage/FollowerCardSection";
import LogoSeach from "./LogoSeach";
import ProfileNavigation from "./Profile/ProfileNavigation";

const ProfileSide = () => {
    return (
        <div className="profileSide relative flex flex-col gap-4 items-center overflow-hidden mt-4 h-[95vh] max-h-screen ">
            <LogoSeach />
            <FollowersCardSection title="People you may know" />
            <div className="w-full absolute bottom-0 z-10">
                <ProfileNavigation />
            </div>
        </div>
    );
};

export default ProfileSide;
