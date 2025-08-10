import {UUID} from "node:crypto";

export interface Task {
	id: UUID
	title: string;
	status: string;
	priority: string;
	path: string;
	tags?: string[];
	linkedTasks?: string[];
	completedTime?: Date; // Date (YYYY-MM-DD) when task was marked as done
	dateCreated: Date; // Creation date (ISO timestamp)
	dateModified: Date; // Last modification date (ISO timestamp)
}
