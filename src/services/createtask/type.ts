import * as Joi from "joi";
import { ObjectSchema } from "joi";

export interface CreateTaskData {
	title: string;
	tags: string[];
	description: string | null;
	body: string | null;
	status: string;
	priority: string;
	linkedTasks: string[] | null;
}

export type TaskBody = `${string}\n${string}`
export type FileNameWithUnixTimePrefix = `${string} - ${string}.md`

export const CREATE_TASK_VALIDATION_SCHEMA: ObjectSchema<CreateTaskData> = Joi.object({
	title: Joi.string().required(),
	description: Joi.string(),
	status: Joi.string().required(),
	priority: Joi.string().required(),
	tags: Joi.array(),
	body: Joi.string(),
	linkedTasks: Joi.array(),
})
