export type ClientError = {
	type: "db" | "validation" | "unknown";
	code?: string;
	message: string;
	field?: string;
	status?: number;
	details?: Record<string, unknown>;
};

function normalizeTarget(target: unknown): string | undefined {
	if (typeof target === "string") return target;
	if (
		Array.isArray(target) &&
		target.length > 0 &&
		typeof target[0] === "string"
	)
		return target[0] as string;
	return undefined;
}

function isObject(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null;
}

function hasName(value: unknown, name: string): boolean {
	return (
		isObject(value) &&
		"name" in value &&
		(value as { name: unknown }).name === name
	);
}

function hasCode(value: unknown): value is { code: string } {
	return (
		isObject(value) && typeof (value as { code?: unknown }).code === "string"
	);
}

function extractFieldFromMessage(message: unknown): string | undefined {
	if (typeof message !== "string") return undefined;
	// Try to match: Unique constraint failed on the fields: (`email`, `other`)
	const fieldsMatch = message.match(/fields?: \(([^)]+)\)/i);
	if (fieldsMatch && fieldsMatch[1]) {
		// pick first backticked token
		const m = fieldsMatch[1].match(/`([^`]+)`/);
		if (m && m[1]) return m[1];
	}
	// Fallback: capture single backticked identifier anywhere
	const anyBacktick = message.match(/`([^`]+)`/);
	if (anyBacktick && anyBacktick[1]) return anyBacktick[1];
	return undefined;
}

export function mapPrismaError(error: unknown): ClientError | null {
	if (hasName(error, "PrismaClientKnownRequestError") && hasCode(error)) {
		if ((error as { code: string }).code === "P2002") {
			const meta = (error as { meta?: Record<string, unknown> }).meta;
			const rawMessage = (error as { message?: string }).message;
			const field =
				normalizeTarget(meta?.target) ?? extractFieldFromMessage(rawMessage);
			const message = field
				? `${field} already exists`
				: "Unique constraint violation";
			return {
				type: "db",
				code: (error as { code: string }).code,
				message,
				field,
				status: 409,
			};
		}
		if ((error as { code: string }).code === "P2003") {
			return {
				type: "db",
				code: (error as { code: string }).code,
				message: "Invalid reference to related record",
				status: 400,
			};
		}
		if ((error as { code: string }).code === "P2025") {
			return {
				type: "db",
				code: (error as { code: string }).code,
				message: "Record not found",
				status: 404,
			};
		}
		return {
			type: "db",
			code: (error as { code: string }).code,
			message: "Database request error",
			status: 400,
		};
	}
	if (hasName(error, "PrismaClientValidationError")) {
		return {
			type: "validation",
			message: "Invalid data for database operation",
			status: 400,
		};
	}
	if (hasName(error, "PrismaClientInitializationError")) {
		return {
			type: "db",
			message: "Database initialization failed",
			status: 500,
		};
	}
	if (hasName(error, "PrismaClientRustPanicError")) {
		return { type: "db", message: "Database engine crashed", status: 500 };
	}
	return null;
}

export function toClientError(error: unknown): ClientError {
	const mapped = mapPrismaError(error);
	if (mapped) return mapped;
	return { type: "unknown", message: "Unexpected server error", status: 500 };
}
