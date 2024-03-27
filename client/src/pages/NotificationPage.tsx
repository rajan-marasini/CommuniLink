import Notification from "@/components/Notification";
import ProfileLeft from "@/components/Profile/ProfileLeft";
import RightSide from "@/components/RightSide";

const NotificationPage = () => {
    return (
        <div className="Home">
            <ProfileLeft />
            <Notification />
            <RightSide />
        </div>
    );
};

export default NotificationPage;
