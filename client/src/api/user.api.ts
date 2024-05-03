import axios from "axios";

export const getProfile = async () => {
    const { data } = await axios.get("/api/v1/user/profile");
    return data;
};

export const register = async ({
    name,
    email,
    password,
}: {
    name: string;
    email: string;
    password: string;
}) => {
    const res = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
    });
    return res.data;
};

export const login = async (formValue: { email: string; password: string }) => {
    const { email, password } = formValue;
    const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
    });
    return res.data;
};

export const loginWithGoogle = async (
    name: string | null,
    email: string | null,
    image: string | null
) => {
    const res = await axios.post("/api/v1/auth/google-login", {
        name,
        email,
        profileImage: image,
    });
    return res.data;
};

export const userLogout = async () => {
    const { data } = await axios.post("/api/v1/auth/logout");
    return data;
};

export const getAllUsers = async () => {
    const res = await axios.get("/api/v1/user/all-users");
    return res.data;
};

export const followUser = async (id: string) => {
    const res = await axios.post(`/api/v1/user/follow/${id}`);

    return res.data;
};

export const fetchOneUser = async (id: string) => {
    const res = await axios.get(`/api/v1/user/${id}`);

    return res.data;
};

export const getAllFollowersOfAUser = async (id: string) => {
    const res = await axios.get("/api/v1/user/followers/" + id);
    return res.data;
};

export const getAllFollowingOfAUser = async (id: string) => {
    const res = await axios.get("/api/v1/user/following/" + id);
    return res.data;
};
