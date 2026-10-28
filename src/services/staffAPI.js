import axios from "axios";

const staffAPI = axios.create({
  baseURL: import.meta.env.STAFF_API_URL || "http://localhost:4000/api/staff",
});

staffAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("staffToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

staffAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    const isLoginRequest = String(error.config?.url || "").endsWith("/login");
    if (error.response?.status === 401 && !isLoginRequest) {
      localStorage.removeItem("staffToken");
      localStorage.removeItem("staffUser");
      if (window.location.pathname !== "/login") window.location.assign("/login");
    }
    return Promise.reject(error);
  }
);

export const loginStaff = async (email, password) => {
  const { data } = await staffAPI.post("/login", { email, password });
  return data;
};

export default staffAPI;
