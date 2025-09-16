import { App, TFile, TFolder } from "obsidian";
import TaskManagerPlugin from "../main";
import { Task } from "../types";
import {
	createRandomUUID,
	createYamlProperties,
	getCurrentDate,
	getCurrentDateTime,
	getTimestampUnixTime
} from "../utils/utils";

const DEFAULT_TAGS: string[] = ["tasks"]

export type TaskBody = `${string}\n${string}`

export interface CreateTaskData {
	title: string;
	tags: string[];
	description: string | null;
	body: string | null;
	status: string;
	priority: string;
	linkedTasks: string[] | null;
}

export async function createTask(createTaskData: CreateTaskData, app: App, plugin: TaskManagerPlugin): Promise<TFile> {
	const currenFolderName = getCurrentDate();
	const rootTaskFolder = await createFolderIfNoExists(app, plugin.settings.main.tasksFolder);
	const currentDateFolder = await createFolderIfNoExists(app,
		`${rootTaskFolder.path}/${currenFolderName}`
	);

	const task: Task = {
		id: createRandomUUID(),
		title: createTaskData.title,
		description: createTaskData.description,
		status: createTaskData.status,
		priority: createTaskData.priority,
		tags: createTags(createTaskData.tags),
		linkedTasks: undefined,
		dateCreated: getCurrentDateTime(),
		dateModified: getCurrentDateTime()
	};
	const fileData = createFileData(task, createTaskData)
	return await createTaskFile(
		getFileNameFromTemplate(task.title),
		fileData,
		currentDateFolder,
		app
	);
}

async function createFolderIfNoExists(app: App, path: string): Promise<TFolder> {
	const value = await app.vault.adapter.exists(path);
	if (!value) {
		return app.vault.createFolder(path);
	}
	return app.vault.getFolderByPath(path) as TFolder;
}

async function createTaskFile(title: string, data: string, folder: TFolder, app: App): Promise<TFile> {
	return app.vault.create(`/${folder.path}/${title}`, data)
}

function getFileNameFromTemplate(title: string): string {
	return `${getTimestampUnixTime()} - ${title}.md`;
}

function createTags(rawTags: string[]): string[] {
	return [...DEFAULT_TAGS, ...rawTags]
		.map(tag => `#${tag}`);
}

function createFileData(task: Task, data: CreateTaskData): TaskBody {
	return `${createYamlProperties(task)}\n${data.body || ""}`;
}
