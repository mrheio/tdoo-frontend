import { z } from 'zod';
import {
	createTodoSchema,
	registerSchema,
	signinSchema,
	updateTodoSchema,
} from './schemas';

export type Session = {
	id: string;
	email: string;
	username: string;
};
export type SigninData = z.infer<typeof signinSchema>;
export type RegisterData = z.infer<typeof registerSchema>;

export type Todo = {
	id: string;
	task: string;
	completed: boolean;
	created_at: Date;
	user_id: string;
};
export type CreateTodoData = z.infer<typeof createTodoSchema>;
export type UpdateTodoData = z.infer<typeof updateTodoSchema>;

export type ApiSuccess<T = unknown> = {
	type: 'success' | 'error';
	statusCode: number;
	data: T;
};
