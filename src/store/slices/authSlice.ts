// authSlice.ts - Create the Redux slice for authentication
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, AuthResponse, VerifyResponse } from '../../types/auth';
import { login, register, verifyAuth, logout } from '../actions/authActions';

// Define the initial state
const initialState: AuthState = {
	user: null,
	token: localStorage.getItem('token'),
	isAuthenticated: false,
	isLoading: false,
	isVerified: false,
	error: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		// Synchronous reducers
		clearError: (state) => {
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			// Login action reducers
			.addCase(login.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(login.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
				state.isLoading = false;
				state.isAuthenticated = true;
				state.isVerified = action.payload.user.isVerified;
				state.user = action.payload.user;
				state.token = action.payload.token;
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			})

			// Register action reducers
			.addCase(register.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(register.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
				state.isLoading = false;
				state.isAuthenticated = true;
				state.user = action.payload.user;
				state.token = action.payload.token;
			})
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			})

			// Verify auth action reducers
			.addCase(verifyAuth.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(verifyAuth.fulfilled, (state, action: PayloadAction<VerifyResponse>) => {
				state.isLoading = false;
				state.isAuthenticated = true;
				state.isVerified = true;
				state.user = action.payload.user;
			})
			.addCase(verifyAuth.rejected, (state, action) => {
				state.isLoading = false;
				state.isAuthenticated = false;
				state.isVerified = false;
				state.error = action.payload as string;
			})

			// Logout action reducer
			.addCase(logout.fulfilled, (state) => {
				state.user = null;
				state.token = null;
				state.isAuthenticated = false;
				state.isVerified = false;
				state.error = null;
			});
	},
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;