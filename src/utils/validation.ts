import type { z as zType } from "zod";
import { z } from "zod";
import { toClientError } from "./error";

export type ActionValidationResult<T = unknown> =
	| { success: true; data: T }
	| {
			success: false;
			type: "validation";
			message: string;
			fieldErrors: Record<string, string[]>;
	  }
	| {
			success: false;
			type: "server-error";
			message: string;
			error: {
				type: string;
				code?: string;
				status?: number;
				field?: string;
			};
	  };

export function validateWithZod<T>(
	schema: zType.ZodSchema<T>,
	data: unknown,
): ActionValidationResult<T> {
	const parseResult = schema.safeParse(data);
	if (!parseResult.success) {
		const flattened = z.flattenError(parseResult.error);
		const fieldErrors: Record<string, string[]> = {};
		for (const [field, messages] of Object.entries(flattened.fieldErrors)) {
			if (Array.isArray(messages) && messages.length > 0)
				fieldErrors[field] = messages;
		}
		return {
			success: false,
			type: "validation",
			message: "Validation failed",
			fieldErrors,
		};
	}
	return { success: true, data: parseResult.data };
}

export async function safeServerAction<T, R>(
	schema: zType.ZodSchema<T>,
	data: unknown,
	action: (validatedData: T) => Promise<R>,
): Promise<ActionValidationResult<R>> {
	const validation = validateWithZod(schema, data);
	if (!validation.success) return validation;

	try {
		const result = await action(validation.data);
		return { success: true, data: result };
	} catch (err) {
		const clientError = toClientError(err);
		return {
			success: false,
			type: "server-error",
			message: clientError.message,
			error: {
				type: clientError.type,
				code: clientError.code,
				status: clientError.status,
				field: clientError.field,
			},
		};
	}
}
