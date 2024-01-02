import { ApiSuccess, RegisterData, Session, SigninData } from '../utils/types';
import api from './api';
import { errorHandler } from './utils';

const register = errorHandler(async (data: RegisterData) => {
	const response = await api.post('auth/register', { json: data }).json();
	return response as ApiSuccess;
});

const signin = errorHandler(async (data: SigninData) => {
	const response = await api.post('auth/signin', { json: data }).json();
	return response as ApiSuccess;
});

const signout = errorHandler(async () => {
	const response = await api.post('auth/signout').json();
	return response as ApiSuccess;
});

const getSession = async () => {
	const response = await api.get('auth/me').json();
	return response as ApiSuccess<Session>;
};

const AuthApi = { register, signin, signout, getSession };

export default AuthApi;
