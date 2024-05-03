import axios from "axios";

export const createPost = async (title: string, image?: File) => {
    let postData: {
        title?: string;
        imageSrc?: string;
    };
    if (image) {
        const formData = new FormData();

        formData.append("photo", image);

        const { data } = await axios.post("/api/v1/image/upload", formData, {
            headers: {
                "Content-Type": "multipart-form/data",
            },
        });
        postData = {
            title,
            imageSrc: data?.imageSrc,
        };
    } else {
        postData = {
            title,
        };
    }

    const res = await axios.post("/api/v1/post/create/", postData);

    return res.data;
};

export const getAllPost = async () => {
    const { data } = await axios.get("/api/v1/post/all-posts");
    return data;
};

export const getAllPostOfUser = async (id: string) => {
    const { data } = await axios.get(`api/v1/post/get-post-of/${id}`);
    return data;
};

export const likeAPost = async (id: string) => {
    const { data } = await axios.post(`api/v1/post/like/${id}`);
    return data;
};
