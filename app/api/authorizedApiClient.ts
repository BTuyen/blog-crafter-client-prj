import apiClient from '@/app/utils/apiClient';
import { getAccessToken, setAccessToken } from '@/app/utils/tokenStorage';
import { showToast } from '@/lib/toast';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { refreshAccessToken } from './tokenRefreshApi';

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

// Đăng ký interceptor MỘT LẦN ở module-level, không phải mỗi lần gọi factory.
let interceptorRegistered = false;

const registerAuthInterceptor = () => {
  if (interceptorRegistered) return;
  interceptorRegistered = true;

  apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as CustomAxiosRequestConfig | undefined;
      const isRefreshCall = originalRequest?.url?.includes("/auth/refresh-token");

      if (
        originalRequest &&
        error.response?.status === 401 &&
        !originalRequest._retry &&
        !isRefreshCall
      ) {
        originalRequest._retry = true;

        const newAccessToken = await refreshAccessToken();

        if (newAccessToken) {
          setAccessToken(newAccessToken);
          if (!originalRequest.headers) {
            originalRequest.headers = {};
          }
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return apiClient(originalRequest);
        }

        showToast("error", "Unauthorized: Token refresh failed");
      }

      return Promise.reject(error);
    }
  );
};

registerAuthInterceptor();

const authorizedApiClient = () => {
  const token = getAccessToken();

  if (!token) {
    showToast("error", "Unauthorized: Missing access token");
    return {
      get: async () => ({ data: null, error: "Unauthorized: Missing access token" }),
      post: async () => ({ data: null, error: "Unauthorized: Missing access token" }),
      patch: async () => ({ data: null, error: "Unauthorized: Missing access token" }),
      delete: async () => ({ data: null, error: "Unauthorized: Missing access token" }),
      put: async () => ({ data: null, error: "Unauthorized: Missing access token" }),
      refreshToken: async () => null
    };
  }

  return {
    get: async (url: string, params?: Record<string, unknown>) => {
      try {
        const config: AxiosRequestConfig = {
          headers: { Authorization: `Bearer ${token}` },
          params,
        };
        const response = await apiClient.get(url, config);
        return { data: response.data.data, error: null };
      } catch (error) {
        return { data: null, error: error instanceof Error ? error.message : "Unknown error" };
      }
    },

    post: async (url: string, data: FormData | Record<string, unknown>, isFormData = false) => {
      try {
        const headers: Record<string, string> = { Authorization: `Bearer ${token}` };
        if (isFormData) headers["Content-Type"] = "multipart/form-data";

        const response = await apiClient.post(url, data, { headers });
        return { data: response.data.data, error: null };
      } catch (error) {
        return { data: null, error: error instanceof Error ? error.message : "Unknown error" };
      }
    },

    patch: async (url: string, data: FormData | Record<string, unknown>, isFormData = false) => {
      try {
        const headers: Record<string, string> = { Authorization: `Bearer ${token}` };
        if (isFormData) headers["Content-Type"] = "multipart/form-data";

        const response = await apiClient.patch(url, data, { headers });
        return { data: response.data.data, error: null };
      } catch (error) {
        return { data: null, error: error instanceof Error ? error.message : "Unknown error" };
      }
    },

    delete: async (url: string, params?: Record<string, unknown>) => {
      try {
        const config: AxiosRequestConfig = {
          headers: { Authorization: `Bearer ${token}` },
          params,
        };
        const response = await apiClient.delete(url, config);
        return { data: response.data.data, error: null };
      } catch (error) {
        return { data: null, error: error instanceof Error ? error.message : "Unknown error" };
      }
    },

    put: async (url: string, data: FormData | Record<string, unknown>, isFormData = false) => {
      try {
        const headers: Record<string, string> = { Authorization: `Bearer ${token}` };
        if (isFormData) headers["Content-Type"] = "multipart/form-data";

        const response = await apiClient.put(url, data, { headers });
        return { data: response.data.data, error: null };
      } catch (error) {
        return { data: null, error: error instanceof Error ? error.message : "Unknown error" };
      }
    },

    refreshToken: async () => {
      try {
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
          setAccessToken(newAccessToken);
          return { data: newAccessToken, error: null };
        }
        return { data: null, error: "Token refresh failed" };
      } catch (error) {
        return { data: null, error: error instanceof Error ? error.message : "Unknown error" };
      }
    }
  };
};

export default authorizedApiClient;
