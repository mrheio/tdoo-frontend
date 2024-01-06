import {
	ApiSuccess,
	CreateTodoData,
	Todo,
	UpdateTodoData,
} from '../utils/types';
import api from './api';
import { errorHandler } from './utils';

const createTodo = errorHandler(async (data: CreateTodoData) => {
	const res = await api.post('todos', { json: data }).json();
	return res as ApiSuccess<Todo>;
});

const updateTodo = errorHandler(async (id: string, data: UpdateTodoData) => {
	const res = await api.put(`todos/${id}`, { json: data }).json();
	return res as ApiSuccess<Todo>;
});

const deleteTodo = errorHandler(async (id: string) => {
	await api.delete(`todos/${id}`);
});

const getTodos = errorHandler(async (filters?: { user_id?: string }) => {
	const res = await api
		.get('todos', {
			searchParams: {
				...(filters?.user_id && { user_id: filters?.user_id }),
				order_by: 'completed',
				order_dir: 'asc',
			},
		})
		.json();
	return res as ApiSuccess<Todo[]>;
});

const getTodoById = errorHandler(async (id: string) => {
	const res = await api.get(`todos/${id}`).json();
	return res as ApiSuccess<Todo>;
});

const TodosService = {
	create: createTodo,
	update: updateTodo,
	delete: deleteTodo,
	getMany: getTodos,
	getOne: getTodoById,
};

export default TodosService;
