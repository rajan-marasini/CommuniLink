import LeftSide from "@/components/LeftSide";
import RightSide from "@/components/RightSide";
import ChangePassword from "@/components/setting/ChangePassword";
import DeleteAccount from "@/components/setting/DeleteAccount";

const Setting = () => {
    return (
        <div className="Home">
            <LeftSide />
            <div className="flex flex-col">
                <ChangePassword />
                <DeleteAccount />
            </div>

            <RightSide />
        </div>
    );
};

export default Setting;
