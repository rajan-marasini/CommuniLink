import { getProfile } from "@/api/user.api";
import { setUser } from "@/features/userSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

interface Props {
    children: React.ReactNode;
}

const UserContextProvider = ({ children }: Props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAuth = async () => {
            const data = await getProfile();
            dispatch(setUser(data.user));
        };
        fetchAuth();
    }, [dispatch]);

    return <div>{children}</div>;
};

export default UserContextProvider;
