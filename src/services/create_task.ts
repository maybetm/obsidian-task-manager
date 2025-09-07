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
import { UUID } from "crypto";

export interface CreateTaskData {
	title: string;
	tags: string[];
	description: string;
	body: string;
	status: string;
	priority: string;
}

export async function createTask(createTaskData: CreateTaskData, app: App, plugin: TaskManagerPlugin): Promise<TFile> {
	const rootTaskFolder = await createFolderIfNoExists(app, plugin.settings.main.tasksFolder);
	const currenFolderName = getCurrentDate();
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
		linkedTasks: createLinkedTasks([]),
		dateCreated: getCurrentDateTime(),
		dateModified: getCurrentDateTime()
	};
	const properties = createYamlProperties(task);
	const fileData = `${properties}\n${createTaskData.body}`;

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
	return rawTags.map(tag => `#${tag}`);
}

function createLinkedTasks(tasks: Task[]): UUID[] {
	return tasks.map(value => value.id)
}
