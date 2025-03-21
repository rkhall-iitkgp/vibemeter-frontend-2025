// src/api/apiInstance.ts
import axios, { AxiosInstance } from 'axios';
import { store } from '../store/store';
import { logout } from '../store/actions/authActions';

/**
 * Create and configure the API instance
 */
const apiInstance: AxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL as string,
	headers: {
		'Content-Type': 'application/json'
	},
	timeout: 15000 // 15 second timeout
});

// Request interceptor - Add Bearer token if it exists
apiInstance.interceptors.request.use(
	(config) => {
		// Get the token from Redux store
		const token = localStorage.getItem('token');

		// If token exists, add it to the Authorization header
		if (token && config.headers) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Response interceptor - Handle authentication errors
// apiInstance.interceptors.response.use(
// 	(response) => response,
// 	(error) => {
// 		// Handle 401 Unauthorized errors (expired token, etc.)
// 		if (error.response && error.response.status === 401) {
// 			// Dispatch logout action to clear auth state
// 			store.dispatch(logout());
// 		}

// 		// Handle other API errors as needed
// 		return Promise.reject(error);
// 	}
// );

export default apiInstance;