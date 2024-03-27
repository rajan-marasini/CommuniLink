import { FaCheck } from "react-icons/fa";

const Notification = () => {
    return (
        <div className="w-full min-h-screen bg-gray-100">
            <div className="max-w-7xl mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6">Notifications</h1>
                <div className="grid grid-cols-1 gap-3 max-w-2xl mx-auto">
                    {/* {notifications?.map((notification, i) => ( */}
                    <div
                        // key={i}
                        className="bg-cardColor dark:bg-darkCardColor p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300"
                    >
                        <p className="text-gray-800">
                            Administrator has just started following you.
                        </p>
                        <div className="flex items-center gap-3 justify-end mt-3">
                            <button
                                className="flex items-center gap-2 text-green-500"
                                onClick={() => {}}
                            >
                                <FaCheck size={18} />
                                Mark as read
                            </button>
                        </div>
                    </div>

                    {/* Ends here */}
                    {/* {notifications?.map((notification, i) => ( */}
                    <div
                        // key={i}
                        className="bg-cardColor dark:bg-darkCardColor p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300"
                    >
                        <p className="text-gray-800">
                            Rajan Marasini has just started following you.
                        </p>
                        <div className="flex items-center gap-3 justify-end mt-3">
                            <button
                                className="flex items-center gap-2 text-green-500"
                                onClick={() => {}}
                            >
                                <FaCheck size={18} />
                                Mark as read
                            </button>
                        </div>
                    </div>

                    {/* Ends here */}
                    {/* {notifications?.map((notification, i) => ( */}
                    <div
                        // key={i}
                        className="bg-cardColor dark:bg-darkCardColor p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300"
                    >
                        <p className="text-gray-800">
                            James R. Hardy has just started following you.
                        </p>
                        <div className="flex items-center gap-3 justify-end mt-3">
                            <button
                                className="flex items-center gap-2 text-green-500"
                                onClick={() => {}}
                            >
                                <FaCheck size={18} />
                                Mark as read
                            </button>
                        </div>
                    </div>

                    {/* Ends here */}
                    {/* {notifications?.map((notification, i) => ( */}
                    <div
                        // key={i}
                        className="bg-cardColor dark:bg-darkCardColor p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300"
                    >
                        <p className="text-gray-800">
                            Jane T. King has just started following you.
                        </p>
                        <div className="flex items-center gap-3 justify-end mt-3">
                            <button
                                className="flex items-center gap-2 text-green-500"
                                onClick={() => {}}
                            >
                                <FaCheck size={18} />
                                Mark as read
                            </button>
                        </div>
                    </div>

                    {/* Ends here */}
                    {/* {notifications?.map((notification, i) => ( */}
                    <div
                        // key={i}
                        className="bg-cardColor dark:bg-darkCardColor p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300"
                    >
                        <p className="text-gray-800">
                            Administrator has just started following you.
                        </p>
                        <div className="flex items-center gap-3 justify-end mt-3">
                            <button
                                className="flex items-center gap-2 text-green-500"
                                onClick={() => {}}
                            >
                                <FaCheck size={18} />
                                Mark as read
                            </button>
                        </div>
                    </div>

                    {/* Ends here */}
                </div>
            </div>
        </div>
    );
};

export default Notification;
