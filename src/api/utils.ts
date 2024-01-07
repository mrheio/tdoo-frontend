import { HTTPError } from 'ky';
import ApiError, { ValidationError } from './ApiError';

const convertError = async (e: unknown) => {
	if (e instanceof HTTPError) {
		const data = await e.response.json();
		return ApiError.isValidationError(data)
			? new ValidationError(data)
			: new ApiError(data);
	}
	return e;
};

export const errorHandler =
	<R>(executable: (...args: any) => Promise<R>) =>
	async (...args: any) => {
		try {
			const result = await executable(...args);
			return result;
		} catch (e) {
			throw await convertError(e);
		}
	};
