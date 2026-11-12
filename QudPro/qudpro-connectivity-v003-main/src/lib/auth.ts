// Authentication utility functions
export const AUTH_TOKEN_KEY = 'userToken';
export const USER_DATA_KEY = 'userData';

export const clearAuthData = () => {
	localStorage.removeItem(AUTH_TOKEN_KEY);
	localStorage.removeItem(USER_DATA_KEY);
	sessionStorage.clear();
};

export const isAuthenticated = (): boolean => {
	const token = localStorage.getItem(AUTH_TOKEN_KEY);
	return !!token;
};

export const getAuthToken = (): string | null => {
	return localStorage.getItem(AUTH_TOKEN_KEY);
};

export const getUserData = () => {
	const userData = localStorage.getItem(USER_DATA_KEY);
	return userData ? JSON.parse(userData) : null;
};