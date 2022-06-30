import axios from "axios";
import utils from "../utils/Utils";

const createConfig = () => {
    const token = utils.getLSToken();
    const config = {
        headers: {
            "Content-Type": "application/json",
            "X-TOKEN": token,
        },
    };

    return config;
};

const createFileConfig = () => {
    const token = utils.getLSToken();
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
            "X-TOKEN": token,
        },
    };

    return config;
};

export const post = async (url, data = null) => {
    const response = await axios.post(url, data);

    return response;
};

export const postWithToken = async (url, data = null) => {
    const response = await axios.post(url, data, createConfig());

    return response;
};

export const postFileWithToken = async (url, data = null) => {
    const response = await axios.post(url, data, createFileConfig());

    return response;
};
