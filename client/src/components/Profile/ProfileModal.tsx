import { userSelector } from "@/features/userSlice";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Input } from "../ui/input";

const ProfileModal = () => {
    const user = useSelector(userSelector);
    const profileImageRef = useRef<HTMLInputElement | null>(null);
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [coverImage, setCoverImage] = useState<File | null>(null);
    const coverImageRef = useRef<HTMLInputElement | null>(null);
    return (
        <div className="py-2 px-4 w-full mx-auto">
            <form onSubmit={() => {}}>
                <div className="relative mb-16">
                    <div className="w-full h-48">
                        <img
                            src={
                                coverImage
                                    ? URL.createObjectURL(coverImage)
                                    : user?.coverImage || "/img/cover.jpg"
                            }
                            alt="Cover Image"
                            className="w-full h-full rounded-lg cursor-pointer"
                            onClick={() => coverImageRef.current?.click()}
                        />
                    </div>
                    <div className="w-28 h-28  absolute -bottom-12 shadow-md shadow-profileShadow">
                        <img
                            src={
                                profileImage
                                    ? URL.createObjectURL(profileImage)
                                    : user?.profileImage || "/img/user.png"
                            }
                            alt="Proflie Image"
                            className="w-full h-full rounded-full cursor-pointer"
                            onClick={() => profileImageRef?.current?.click()}
                        />
                    </div>
                </div>
                <input
                    type="file"
                    hidden
                    ref={profileImageRef}
                    accept="image/*"
                    onChange={(e) =>
                        setProfileImage(e.target.files?.[0] as File)
                    }
                />
                <input
                    type="file"
                    hidden
                    ref={coverImageRef}
                    accept="image/*"
                    onChange={(e) => setCoverImage(e.target.files?.[0] as File)}
                />
                <div className="mb-2 flex items-center gap-6 justify-between">
                    <div className="flex-1">
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            FirstName
                        </label>
                        <Input
                            defaultValue={user?.name.split(" ")[0]}
                            className="mt-1 px-3 py-1 border border-gray-300 rounded-md w-full"
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
                            className="mt-1 px-3 py-1 border border-gray-300 rounded-md w-full"
                        />
                    </div>
                </div>
                <div className="mb-2">
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Email
                    </label>
                    <Input
                        value={user?.email}
                        className="mt-1 px-3 py-1 border border-gray-300 rounded-md w-full"
                        readOnly
                    />
                </div>
                <div className="mb-2 flex items-center gap-2 justify-between">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Relation Status
                        </label>
                        <Input
                            defaultValue={user?.relationStatus}
                            className="mt-1 px-3 py-1 border border-gray-300 rounded-md w-full"
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
                            className="mt-1 px-3 py-1 border border-gray-300 rounded-md w-full"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Job Title
                        </label>
                        <Input
                            defaultValue={user?.jobTitle}
                            className="mt-1 px-3 py-1 border border-gray-300 rounded-md w-full"
                        />
                    </div>
                </div>
                <div className="mb-2 flex items-center gap-2 justify-between">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            State
                        </label>
                        <Input
                            defaultValue={user?.address?.state}
                            className="mt-1 px-3 py-1 border border-gray-300 rounded-md w-full"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            City
                        </label>
                        <Input
                            defaultValue={user?.address?.city}
                            className="mt-1 px-3 py-1 border border-gray-300 rounded-md w-full"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Street
                        </label>
                        <Input
                            defaultValue={user?.address?.street}
                            className="mt-1 px-3 py-1 border border-gray-300 rounded-md w-full"
                        />
                    </div>
                </div>
                {/* Add more form fields here */}
            </form>
        </div>
    );
};

export default ProfileModal;
