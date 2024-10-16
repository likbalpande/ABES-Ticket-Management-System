import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
    timeout: 35000,
    withCredentials: true,
    headers: {
        // "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "*",
    },
});
