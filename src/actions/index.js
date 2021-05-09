"use strict";

import axios from "axios";
import router from "@/router/index";
import store from "@/store/index";

export const HTTP = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: process.env.VUE_APP_API_BASE_URL,
  // changeOrigin: true
});

export function apiInfo() {
  return HTTP.get("/")
    .then((value) => value.data)
    .catch((err) => err?.response?.data);
}

HTTP.interceptors.request.use(
  async (config) => {
    config.headers.Authorization = `Bearer ${store.getters.getToken}`;
    return config;
  },
  (error) => Promise.reject(error)
);

HTTP.interceptors.response.use(
  async (config) => config,
  async (error) => {
    // eslint-disable-next-line no-underscore-dangle
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config.__isRetryRequest
    ) {
      await store.dispatch("addRefreshToken");
      // eslint-disable-next-line no-underscore-dangle
      error.config.__isRetryRequest = true;
      error.config.headers.Authorization = `Bearer ${store.getters.getToken}`;
      return HTTP.request(error.config);
    }
    if (
      error.response.status === 403 &&
      router.currentRoute.name !== "Forbidden"
    ) {
      router.push({ name: "Forbidden" });
    }
    return Promise.reject(error);
  }
);
