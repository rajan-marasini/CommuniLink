import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import FollowersCardSection from "../Homepage/FollowerCardSection";

export default function ShowFollowerCard() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <span className="cursor-pointer">Followers</span>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <div className="flex items-center space-x-2">
                    <FollowersCardSection title="Followers" />
                </div>
            </DialogContent>
        </Dialog>
    );
}
