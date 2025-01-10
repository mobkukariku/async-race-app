import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://async-race-server-production-bf9e.up.railway.app",
    headers: {
        "Content-Type": "application/json",
    },
});
