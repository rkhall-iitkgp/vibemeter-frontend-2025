// authActions.ts - Create the async thunks for authentication
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
	AuthState,
	LoginCredentials,
	RegisterData,
	AuthResponse,
	VerifyResponse
} from '../../types/auth';
import apiInstance from '@/api/apiInstance';

export const login = createAsyncThunk<
	AuthResponse,
	LoginCredentials,
	{ rejectValue: string }
>(
	'auth/login',
	async (credentials, { rejectWithValue }) => {
		try {
			const response = await apiInstance.post<AuthResponse>('login', credentials);

			// Store token in localStorage for persistence
			localStorage.setItem('token', response.data.token);
			return response.data;
		} catch (error: any) {
			// Handle axios error
			const errorMessage = error.response?.data?.message || 'Login failed';
			return rejectWithValue(errorMessage);
		}
	}
);

export const register = createAsyncThunk<
	AuthResponse,
	RegisterData,
	{ rejectValue: string }
>(
	'auth/register',
	async (userData: RegisterData, { rejectWithValue }) => {
		try {
			const response = await apiInstance.post<AuthResponse>('register', userData);

			// Store token in localStorage
			localStorage.setItem('token', response.data.token);
			return response.data;
		} catch (error: any) {
			// Handle axios error
			const errorMessage = error.response?.data?.message || 'Registration failed';
			return rejectWithValue(errorMessage);
		}
	}
);

export const verifyAuth = createAsyncThunk<
	VerifyResponse,
	void,
	{
		state: { auth: AuthState },
		rejectValue: string
	}
>(
	'auth/verify',
	async (_, { getState, rejectWithValue }) => {
		try {
			// Get the current state to access the token
			const { auth } = getState();
			const token = auth.token;

			if (!token) {
				return rejectWithValue('No token found');
			}

			const response = await axios.get<VerifyResponse>(`${import.meta.env.BASE_URL}/verify`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			return response.data;
		} catch (error: any) {
			// Clear token if verification fails
			localStorage.removeItem('token');
			const errorMessage = error.response?.data?.message || 'Verification failed';
			return rejectWithValue(errorMessage);
		}
	}
);

export const logout = createAsyncThunk<
	null,
	void
>(
	'auth/logout',
	async () => {
		localStorage.removeItem('token');
		return null;
	}
);