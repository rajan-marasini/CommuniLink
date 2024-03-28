import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import toast from "react-hot-toast";
import ProfileModal from "../Profile/ProfileModal";

export function ProfileModalTrigger() {
    const handleProfileUpdate = async () => {
        toast.success("Updating....");
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="button px-6 py-2">Edit Profile</button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when
                        you're done.
                    </DialogDescription>
                </DialogHeader>
                <ProfileModal />

                <DialogFooter>
                    <Button variant={"destructive"}>Cancel</Button>
                    <button
                        className="button px-6"
                        onClick={handleProfileUpdate}
                    >
                        Update
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
