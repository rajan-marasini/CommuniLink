import { userSelector } from "@/features/userSlice";
import { useSelector } from "react-redux";
import { Input } from "../ui/input";

const ProfileModal = () => {
    const user = useSelector(userSelector);
    return (
        <div className="p-6 w-full mx-auto">
            <form onSubmit={() => {}}>
                <div className="mb-4 flex items-center gap-6 justify-between">
                    <div className="flex-1">
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            FirstName
                        </label>
                        <Input
                            defaultValue={user?.name.split(" ")[0]}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        />
                    </div>
                    <div className="flex-1">
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            LastName
                        </label>
                        <Input
                            defaultValue={user?.name.split(" ").slice(1)}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Email
                    </label>
                    <Input
                        value={user?.email}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        readOnly
                    />
                </div>
                <div className="mb-4 flex items-center gap-2 justify-between">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Relation Status
                        </label>
                        <Input
                            defaultValue={user?.relationStatus}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Works At
                        </label>
                        <Input
                            defaultValue={user?.worksAt}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Lives in
                        </label>
                        <Input
                            defaultValue={user?.address?.city}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        />
                    </div>
                </div>
                {/* Add more form fields here */}
            </form>
        </div>
    );
};

export default ProfileModal;
