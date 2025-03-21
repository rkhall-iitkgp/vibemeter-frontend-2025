// types.ts - Define authentication types

// User interface
export interface User {
	id: string;
	email: string;
	name: string;
	isVerified: boolean;
	// Add any other user properties
}

// Authentication state interface
export interface AuthState {
	user: User | null;
	token: string | null;
	isAuthenticated: boolean;
	isVerified: boolean;
	isLoading: boolean;
	error: string | null;
}

// Login credentials type
export type LoginCredentials = {
	email: string;
	password: string;
};

// Registration data type
export type RegisterData = {
	name: string;
	email: string;
	password: string;
};

// Auth response interfaces
export interface AuthResponse {
	user: User;
	token: string;
}

export interface VerifyResponse {
	user: User;
}