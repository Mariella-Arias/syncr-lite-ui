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
