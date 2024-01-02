import { defineStore } from 'pinia';
import { ref } from 'vue';
import TodosService from '../api/todos.api';
import { CreateTodoData, Todo, UpdateTodoData } from '../utils/types';

export const useTodos = defineStore('todos', () => {
	const todos = ref<Todo[]>([]);
	const isLoading = ref(false);
	const success = ref<'create' | 'update' | 'delete' | 'fetch' | null>(null);
	const error = ref<any>(null);

	const isSuccess = {
		create: () => success.value === 'create',
		update: () => success.value === 'update',
		delete: () => success.value === 'delete',
		fetch: () => success.value === 'fetch',
	};

	const createTodo = async (data: CreateTodoData) => {
		try {
			isLoading.value = true;
			success.value = null;
			error.value = null;

			const res = await TodosService.create(data);

			todos.value = [...todos.value, res.data];
			success.value = 'create';
		} catch (e) {
			error.value = e;
		} finally {
			isLoading.value = false;
		}
	};

	const updateTodo = async (id: string, data: UpdateTodoData) => {
		try {
			isLoading.value = true;
			success.value = null;
			error.value = null;

			const res = await TodosService.update(id, data);

			todos.value = todos.value.map((td) =>
				td.id === id ? res.data : td,
			);
			success.value = 'update';
		} catch (e) {
			error.value = e;
		} finally {
			isLoading.value = false;
		}
	};

	const deleteTodo = async (id: string) => {
		try {
			isLoading.value = true;
			success.value = null;
			error.value = null;

			await TodosService.delete(id);

			todos.value = todos.value.filter((td) => td.id !== id);
			success.value = 'delete';
		} catch (e) {
			error.value = e;
		} finally {
			isLoading.value = false;
		}
	};

	const fetchTodos = async (filters?: { user_id?: string }) => {
		try {
			isLoading.value = true;
			success.value = null;
			error.value = null;

			const res = await TodosService.getMany(filters);

			todos.value = res.data;
			success.value = 'fetch';
		} catch (e) {
			error.value = e;
		} finally {
			isLoading.value = false;
		}
	};

	return {
		todos,
		isLoading,
		isSuccess,
		success,
		error,
		createTodo,
		updateTodo,
		deleteTodo,
		fetchTodos,
	};
});
