import axios from "axios";
import envConfig from "@/app/config";

const apiClient = axios.create({
  baseURL: envConfig.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
