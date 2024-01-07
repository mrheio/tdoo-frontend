type ErrorResponse<T> = {
	type: 'error';
	statusCode: number;
	message: string;
	details: T;
};

export default class ApiError<T> extends Error {
	type: 'error';
	statusCode: number;
	details: T;

	constructor(error: ErrorResponse<T>) {
		super(error.message);
		this.type = error.type;
		this.statusCode = error.statusCode;
		this.details = error.details;
	}

	static isValidationError(e: any) {
		return e.details.formErrors && e.details.fieldErrors;
	}
}

export class ValidationError extends ApiError<{
	formErrors: any[];
	fieldErrors: any;
}> {
	constructor(error: ErrorResponse<{ formErrors: any[]; fieldErrors: any }>) {
		super(error);
	}
}
