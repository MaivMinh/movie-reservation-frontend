import axios from "axios";

/// Cấu hình chung.
const API_BASE_URL = "https://moviereservation.software";

/// Tạo instance tập trung.
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
  timeout: 10000,
});

const refreshToken = async () => {
  const refreshToken = localStorage.getItem("refresh-token");
  if (!refreshToken) {
    return Promise.reject("No refresh token found");
  }

  return apiClient
    .post("/api/auth/refresh-token", { refreshToken })
    .then((response) => {
      const payload = response.data;
      const data = payload.data;
      const newAccessToken = data.accessToken;
      localStorage.setItem("access-token", newAccessToken);
      return newAccessToken;
    })
    .catch((error) => {
      console.error("Failed to refresh token:", error);
      return null;
    });
};

/// Interceptors cho request.
apiClient.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    const token = localStorage.getItem("access-token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Do something with response error
    if (error.response && error.response.status === 498) {
      // Handle unauthorized access
      localStorage.removeItem("access-token");
      /// Thực hiện refresh token.

      const newAccessToken = await refreshToken();
      if (newAccessToken) {
        localStorage.setItem("access-token", newAccessToken);
        error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
        // Retry the original request with the new access token
        return apiClient(error.config);
      }
    }
    if (error.response && error.response.status === 499) {
      /// Handle refresh token expired.
      localStorage.removeItem("access-token");
      localStorage.removeItem("refresh-token");
      localStorage.removeItem("profile");
      window.location.href = "/login?expired=true";
      /// Redirect to login page.
      return Promise.reject("Refresh token expired");
    }
    return Promise.reject(error);
  }
);

apiClient.getData = async (url, params = {}, config = {}) => {
  const response = await apiClient.get(url, {
    params,
    ...config,
  });
  return response.data;
};

export default apiClient;
