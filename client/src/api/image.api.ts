import axios from "axios";

export const imageUpload = async (photo: FormData) => {
    const { data } = await axios.post("/api/v1/image/upload", photo, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return data;
};
