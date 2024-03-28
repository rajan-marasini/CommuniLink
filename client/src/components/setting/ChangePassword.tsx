import { Button } from "@/components/ui/button";
import { useState } from "react";

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    return (
        <div className="flex-1 self-start mt-12">
            <form className="max-w-lg mx-auto flex-1">
                <h1 className="text-3xl font-bold mb-5">Change Password</h1>
                <div className="mb-4">
                    <label
                        htmlFor="currentPassword"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Current Password
                    </label>
                    <input
                        type="password"
                        id="currentPassword"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="infoInput"
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="newPassword"
                        className="block text-sm font-medium text-gray-700"
                    >
                        New Password
                    </label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="infoInput"
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Confirm New Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="infoInput"
                    />
                </div>
                <Button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
                >
                    Change Password
                </Button>
            </form>
        </div>
    );
};

export default ChangePassword;
