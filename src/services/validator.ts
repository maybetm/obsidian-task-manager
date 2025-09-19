import { ObjectSchema } from "joi";
import { Notice } from "obsidian";

export function validateSchema<T>(scheme: ObjectSchema<T>, object: T): { isValid: boolean } {
	const { error } = scheme.validate(object, { abortEarly: false })
	if (!error) {
		return { isValid: true };
	}

	error?.details?.forEach((detail) => showNotice(detail.message))

	return { isValid: false };
}

export function showNotice(message: string) {
	new Notice(message);
}

