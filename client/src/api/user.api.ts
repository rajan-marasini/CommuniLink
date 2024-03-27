import axios from "axios";

export const getProfile = async () => {
    const { data } = await axios.get("/api/v1/user/profile");
    return data;
};

export const login = async (formValue: { email: string; password: string }) => {
    const { email, password } = formValue;
    const res = await axios.post("/api/v1/user/login", {
        email,
        password,
    });
    return res.data;
};

export const userLogout = async () => {
    const { data } = await axios.post("/api/v1/user/logout");
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
    const res = await axios.get(`/api/v1/user/get/${id}`);

    return res.data;
};
