import axios from "axios";
import Cookies from "js-cookie";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const getAccessToken = async () => {
  const accessToken = Cookies.get("access_token") || null;
  return accessToken;
};

const PUBLIC_PATHS = ["/cars/filter", "/cars/external", "/cars/owners"];

axiosClient.interceptors.request.use(
  async (config) => {
    const accessToken = await getAccessToken();
    // Tạo URL từ base + config.url
    const fullUrl = new URL(
      config.url!,
      axiosClient.defaults.baseURL // đảm bảo xử lý đúng cả khi url là relative
    );
    const pathname = fullUrl.pathname;

    const isPublicPath = PUBLIC_PATHS.some((publicPath) =>
      pathname.startsWith(publicPath)
    );
    console.log("[Axios Interceptor] URL:", fullUrl.toString());
    console.log("[Axios Interceptor] pathname:", pathname);
    console.log("[Axios Interceptor] isPublicPath:", isPublicPath);
    console.log("[Axios Interceptor] accessToken:", accessToken ? "YES" : "NO");
    if (accessToken && !isPublicPath) {
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
        const { data } = await axios.post("/auth/refresh-token", {
          refreshToken: refreshToken,
        });
        // Set new access token in cookies
        const newAccessToken = data.data.accessToken;
        const newRefreshToken = data.data.refreshToken;
        Cookies.set("access_token", newAccessToken, {
          expires: 1,
          secure: true,
        });
        Cookies.set("refresh_token", newRefreshToken, {
          expires: 7,
          secure: true,
        });
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
