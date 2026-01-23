import axios from "axios";
import * as url from "../utils/Url";
import { getLocalStorageItem } from "@/utils/localStorage";

export function request(baseUrl) {
  const request = axios.create({
    baseURL: baseUrl || url.BASE_URL,
    timeout: 90000,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: false,
  });

  // ✅ Attach token dynamically for every request
  request.interceptors.request.use((config) => {
    const userInfo = getLocalStorageItem("user-info", {});
    const token = userInfo?.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }

    return config;
  });

  // ✅ Response Interceptor
  request.interceptors.response.use(
    (response) => {
      if (response?.data?.data) {
        response.data = response.data.data;
      }
      return response;
    },
    async (error) => {
      let message = "Oops, something went wrong at our end.";
      let data = null;

      if (!error.response) {
        if (error.code === "ECONNABORTED") {
          message = "Network timeout, please try again.";
        } else {
          message = "Unable to connect to the server.";
        }
        return Promise.reject({ status: "error", message, data });
      }

      const { status, data: errData } = error.response;
      data = errData;
      message = errData?.message || message;

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
