import { z } from 'zod';

export const signinSchema = z.object({
	username: z.string().min(3),
	password: z.string(),
});

export const registerSchema = z.object({
	email: z.string().email(),
	username: z.string().min(3),
	password: z.string(),
});

export const createTodoSchema = z.object({
	task: z.string(),
	completed: z.boolean().optional(),
	user_id: z.string(),
});

export const updateTodoSchema = z.object({
	task: z.string().optional(),
	completed: z.boolean().optional(),
});
