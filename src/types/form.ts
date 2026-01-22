import type React from "react";

export interface RHFFieldProps {
	name: string;
	value: unknown;
	onChange: (...event: unknown[]) => void;
	onBlur: () => void;
}

export interface RHFFieldState {
	invalid: boolean;
	error?: { message?: string } | undefined;
}

export interface BaseFormFieldProps {
	field: RHFFieldProps;
	fieldState: RHFFieldState;
	label: string;
	description?: React.ReactNode;
	className?: string;
	/** Optional extra class for the FieldError */
	errorClassName?: string;
	/** Optional class overrides for label and description */
	labelClassName?: string;
	descriptionClassName?: string;
}

export interface FormInputProps extends BaseFormFieldProps {
	inputProps?: Omit<
		React.InputHTMLAttributes<HTMLInputElement>,
		"name" | "value" | "onChange" | "onBlur" | "id"
	>;
}

export interface FormTextareaProps extends BaseFormFieldProps {
	textareaProps?: Omit<
		React.TextareaHTMLAttributes<HTMLTextAreaElement>,
		"name" | "value" | "onChange" | "onBlur" | "id"
	>;
}

export interface SelectOption {
	value: string;
	label: string;
}

export interface FormSelectProps extends BaseFormFieldProps {
	options: SelectOption[];
	selectPlaceholder?: string;
}

export interface FormCheckboxProps extends BaseFormFieldProps {
	checkboxLabel?: string;
}

export interface FormFileInputProps extends BaseFormFieldProps {
	inputProps?: Omit<
		React.InputHTMLAttributes<HTMLInputElement>,
		"name" | "value" | "onChange" | "onBlur" | "id" | "type"
	>;
}
