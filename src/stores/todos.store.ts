import { defineStore } from 'pinia';
import { ref } from 'vue';
import TodosService from '../api/todos.api';
import { Todo } from '../utils/types';
import { useSession } from './session.store';

export const useTodos = defineStore('todos', () => {
	const todos = ref<Todo[]>([]);
	const loading = ref(false);
	const success = ref(false);
	const error = ref<any>(null);

	const fetchTodos = async (filters?: {
		user_id?: string;
		order_by?: string;
		order_dir?: string;
	}) => {
		try {
			loading.value = true;
			success.value = false;
			error.value = null;
			const res = await TodosService.getMany(filters);
			todos.value = res.data;
			success.value = true;
		} catch (e) {
			error.value = e;
		} finally {
			loading.value = false;
		}
	};

	const fetchCurrentSessionTodos = async () =>
		fetchTodos({ user_id: useSession()!.session?.id });

	return {
		todos,
		loading,
		success,
		error,
		fetchTodos,
		fetchCurrentSessionTodos,
	};
});
