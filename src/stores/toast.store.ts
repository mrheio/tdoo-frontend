import { defineStore } from 'pinia';
import { useToast } from 'primevue/usetoast';

export const useMyToast = defineStore('toast', () => {
	const toast = useToast();
	const life = 3000;

	const success = (message: string) => {
		toast.add({ summary: message, severity: 'success', life });
	};

	const error = (message: string) => {
		toast.add({ summary: message, severity: 'error', life });
	};

	const warn = (message: string) => {
		toast.add({ summary: message, severity: 'warn', life });
	};

	const info = (message: string) => {
		toast.add({ summary: message, severity: 'info', life });
	};

	return {
		success,
		error,
		warn,
		info,
	};
});
