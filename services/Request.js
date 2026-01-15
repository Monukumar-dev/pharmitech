import axios from "axios";
import * as url from "../utlis/Url";
import {
  clearLocalStorage,
  getLocalStorageItem,
  setLocalStorageItem,
} from "@/utlis/localStorage";

export function request(baseUrl) {
  // --------------------------------------------------
  // ✅ Dynamic baseURL — fallback to default
  // --------------------------------------------------
  const request = axios.create({
    baseURL: baseUrl || url.BASE_URL,
    timeout: 90000,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  // --------------------------------------------------
  // ✅ Set Authorization token from localStorage
  // --------------------------------------------------
  const userInfo = getLocalStorageItem("user-info", {})
  if (userInfo?.access_token) {
    request.defaults.headers.common["Authorization"] = `Bearer ${userInfo.access_token}`;
  }

  // --------------------------------------------------
  // ✅ Response Interceptor
  // --------------------------------------------------
  request.interceptors.response.use(
    (response) => {
      // Simplify data structure
      if (response?.data?.data) {
        response.data = response.data.data;
      }
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      let message = "Oops, something went wrong at our end.";
      let data = null;

      // ----------------------------
      // ❌ Network errors
      // ----------------------------
      if (!error.response) {
        if (error.code === "ECONNABORTED") {
          message = "Network timeout, please try again.";
        } else {
          message = "Unable to connect to the server.";
        }
        return Promise.reject({ status: "error", message, data });
      }

      // ----------------------------
      // ⚠️ HTTP errors
      // ----------------------------
      const { status, data: errData } = error.response;
      data = errData;
      message = errData?.message || message;

      // ----------------------------
      // 🔐 Handle 401 (token refresh)
      // ----------------------------
      if (status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const { data: tokenData } = await axios.post(
            `${url.BASE_URL}/api/auth/refresh`,
            {},
            { withCredentials: true }
          );

          const newToken = tokenData?.access_token;
          if (newToken) {
            // ✅ Update headers
            request.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

            // ✅ Update localStorage
            localStorage.setItem("user-info",JSON.stringify({ ...userInfo, access_token: newToken }));

            // ✅ Retry original request
            return request(originalRequest);
          }
        } catch (refreshError) {
          // If refresh fails → clear auth & redirect
          localStorage.removeItem("user-info");
          //window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      }

      // ----------------------------
      // 🧱 Custom message fallback
      // ----------------------------
      if (status === 500 && message === "No message available") {
        message = "Internal Server Error. Please try again later.";
      } else if (errData?.description) {
        message = errData.description;
      }

      return Promise.reject({ status: "error", message, data });
    }
  );

  return request;
}
