
type UUID = `${string}-${string}-${string}-${string}-${string}`;

export interface Task {
	id: UUID
	title: string;
	description: string;
	status: string;
	priority: string;
	tags?: string[];
	linkedTasks?: UUID[];
	completedTime?: Date; // Date (YYYY-MM-DD) when task was marked as done
	dateCreated: string; // Creation date (ISO timestamp)
	dateModified: string // Last modification date (ISO timestamp)
}

