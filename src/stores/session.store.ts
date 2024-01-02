import { defineStore } from 'pinia';
import { ref } from 'vue';
import AuthApi from '../api/auth.api';
import { RegisterData, Session, SigninData } from '../utils/types';

export const useSession = defineStore('session', () => {
	const session = ref<Session | null>(null);
	const isLoading = ref(false);
	const success = ref<'signin' | 'register' | 'signout' | 'fetch' | null>(
		null,
	);
	const error = ref<any>(null);

	const register = async (data: RegisterData) => {
		try {
			isLoading.value = true;
			success.value = null;
			error.value = null;

			await AuthApi.register(data);
			const res = await AuthApi.getSession();

			session.value = res.data;
			success.value = 'register';
		} catch (e) {
			error.value = e;
		} finally {
			isLoading.value = false;
		}
	};

	const signin = async (data: SigninData) => {
		try {
			isLoading.value = true;
			success.value = null;
			error.value = null;

			await AuthApi.signin(data);
			const res = await AuthApi.getSession();

			session.value = res.data;
			success.value = 'signin';
		} catch (e) {
			error.value = e;
		} finally {
			isLoading.value = false;
		}
	};

	const signout = async () => {
		try {
			isLoading.value = true;
			success.value = null;
			error.value = null;

			await AuthApi.signout();
			const res = await AuthApi.getSession();

			session.value = res.data;
			success.value = 'signout';
		} catch (e) {
			error.value = e;
		} finally {
			isLoading.value = false;
		}
	};

	const getSession = async () => {
		try {
			isLoading.value = true;
			success.value = null;
			error.value = null;

			const res = await AuthApi.getSession();

			session.value = res.data;
			success.value = 'fetch';
		} catch (e) {
			error.value = e;
		} finally {
			isLoading.value = false;
		}
	};

	return {
		session,
		isLoading,
		success,
		error,
		register,
		signin,
		signout,
		getSession,
	};
});
