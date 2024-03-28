import { Button } from "@/components/ui/button";
import { useState } from "react";

const DeleteAccount = () => {
    const [text, setText] = useState("");
    return (
        <div>
            <div className="mb-6 ">
                <h2 className="text-lg font-semibold text-red-600 mb-2">
                    Danger Zone
                </h2>
                <p className="text-sm text-red-600 mb-4">
                    Warning: Deleting your account is irreversible!
                </p>
                <form onSubmit={() => {}} className="flex flex-col">
                    <div className="mb-4">
                        <label
                            htmlFor="confirmInput"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Type "Delete My Account" to confirm
                        </label>
                        <input
                            id="confirmInput"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="infoInput"
                        />
                    </div>

                    <Button
                        type="submit"
                        className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md self-end disabled:opacity-60 disabled:cursor-not-allowed"
                        disabled={text !== "Delete My Account"}
                    >
                        Delete Account
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default DeleteAccount;
