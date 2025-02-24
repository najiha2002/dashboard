import axios from "axios";

export const getProtectedData = async () => {
    return await axios.get("http://localhost:8000/protected-route", {
        withCredentials: true
    });
};