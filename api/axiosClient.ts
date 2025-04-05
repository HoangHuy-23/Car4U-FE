import axios from "axios";
import Cookies from "js-cookie";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const getAccessToken = async () => {
  const accessToken = Cookies.get("access_token") || null;
  return accessToken;
};

axiosClient.interceptors.request.use(
  async (config) => {
    const accessToken = await getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      try {
        const refreshToken = Cookies.get("refresh_token") || null;
        const { data } = await axios.post(
          "/auth/refresh-token",
          {
            refreshToken: refreshToken,
          }
        );
        // Set new access token in cookies
        const newAccessToken = data.data.accessToken;
        const newRefreshToken = data.data.refreshToken;
        Cookies.set("access_token", newAccessToken, { expires: 1, secure: true });
        Cookies.set("refresh_token", newRefreshToken, { expires: 7, secure: true });
        // Retry the original request with the new access token
        error.config.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosClient.request(error.config);
      } catch (error) {
        // Handle refresh token failure (e.g., redirect to login page)
        console.error("Refresh token failed:", error);
        // Optionally, you can redirect to the login page or show a message to the user
        window.location.href = "/login"; // Redirect to login page
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
