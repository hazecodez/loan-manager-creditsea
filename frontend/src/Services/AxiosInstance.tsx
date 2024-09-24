import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://loan-manager-s9on.onrender.com"
})

export default axiosInstance;