import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import PostShare from "./PostShare";

export function DialogCloseButton() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="button w-full mt-4">
                    Share
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <PostShare />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
