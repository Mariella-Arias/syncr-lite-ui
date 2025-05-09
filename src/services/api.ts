import axios, { AxiosError } from 'axios';

export interface ApiResponse<T = any> {
  data: T;
  status: number;
  errors?: any;
}

export interface ApiError {
  code: string;
  message: string;
  errors?: any;
}

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  timeout: 5000,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

// Response interceptor for token refresh
instance.interceptors.response.use(
  (response) => {
    // console.log('Response returned from interceptor');
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    // console.log('API ERROR');
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== 'token/refresh/'
    ) {
      originalRequest._retry = true; // Mark the request to avoid infinite loops

      try {
        await instance.post('token/refresh/');

        return instance(originalRequest);
      } catch (refreshError) {
        // console.log('Token refresh failed', refreshError);

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

const api = {
  post: async <T>(url: string, data = {}, config = {}): Promise<any> => {
    const response = await instance.post<ApiResponse<T>>(url, data, config);
    return response.data;
  },
  get: async <T>(url: string, config = {}): Promise<any> => {
    const response = await instance.get<ApiResponse<T>>(url, config);
    return response.data;
  },
  delete: async <T>(url: string, data = {}, config = {}): Promise<any> => {
    const response = await instance.delete<ApiResponse<T>>(url, {
      ...config,
      data,
    });
    return response.data;
  },
  put: async <T>(url: string, data = {}, config = {}): Promise<any> => {
    const response = await instance.put<ApiResponse<T>>(url, data, config);
    return response.data;
  },
  patch: async <T>(url: string, data = {}, config = {}): Promise<any> => {
    const response = await instance.patch<ApiResponse<T>>(url, data, config);
    return response.data;
  },
};

export const handleApiError = (error: AxiosError<ApiResponse>): ApiError => {
  if (error.response) {
    // Server responded with status code out of the range of 2xx
    return {
      code: error.code as string,
      message: error.message || 'An error occurred',
      errors: error.response.data,
    };
  } else if (error.request) {
    // The request was made but no response was received
    return {
      code: 'NETWORK_ERROR',
      message: 'Network error occurred. Please check your connection.',
    };
  } else {
    // Something happened in setting up the request that triggered an Error
    return {
      code: 'REQUEST_SETUP_ERROR',
      message:
        error.message || 'An error occurred while setting up the request.',
    };
  }
};

export default api;
