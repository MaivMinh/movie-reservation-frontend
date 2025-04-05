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

/// Interceptors cho response.
apiClient.interceptors.response.use((response) => {
  // Do something with response data
  if (response.data && response.data.status) {
    if (response.data.status === 401) {
      localStorage.removeItem("access-token");
      window.location.href = "/login";
    }
  }
  return response;
});

apiClient.getData = async (url, params = {}, config = {}) => {
  const response = await apiClient.get(url, {
    params,
    ...config,
  });
  return response.data;
};

export default apiClient;
