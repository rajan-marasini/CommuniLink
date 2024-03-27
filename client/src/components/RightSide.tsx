import { DialogCloseButton } from "./Homepage/PostShareDialouge";
import NavBar from "./NavBar";
import TrendCard from "./TrendCard";

const RightSide = () => {
    return (
        <div className="w-full flex-col gap-8 px-4 mt-4">
            <NavBar />
            <TrendCard />
            <div className="w-full">
                <DialogCloseButton />
            </div>
        </div>
    );
};

export default RightSide;
