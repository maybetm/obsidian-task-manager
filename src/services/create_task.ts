import {App, TFile, TFolder} from "obsidian";
import TaskManagerPlugin from "../main";
import {Task} from "../types";
import {
	createRandomUUID,
	createYamlProperties,
	getCurrentDate,
	getCurrentDateTime,
	getTimestampUnixTime
} from "../utils/utils";
import {UUID} from "crypto";

export interface CreateTaskData {
	title: string;
	tags: string[];
}

export async function createTask(data: CreateTaskData, app: App, plugin: TaskManagerPlugin): Promise<TFile> {
	const rootTaskFolder = await createFolderIfNoExists(app, plugin.settings.tasksFolder);
	const currenFolderName = getCurrentDate();
	const currentDateFolder = await createFolderIfNoExists(app,
		`${rootTaskFolder.path}/${currenFolderName}`
	);

	return await createTaskFile(
		getFileNameFromTemplate(data.title),
		createYamlProperties({
			id: createRandomUUID(),
			title: data.title,
			status: "",
			priority: "",
			tags: createTags(data.tags),
			linkedTasks: createLinkedTasks([]),
			dateCreated: getCurrentDateTime(),
			dateModified: getCurrentDateTime()
		} as Task),
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
