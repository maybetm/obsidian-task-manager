import {App, TFile, TFolder} from "obsidian";
import TaskManagerPlugin from "../../main";
import {CreateTaskModalData} from "./index";
import {format} from "date-fns/format";

export async function createTask(data: CreateTaskModalData, app: App, plugin: TaskManagerPlugin): Promise<TFile> {
	const rootTaskFolder = await createFolderIfNoExists(app, plugin.settings.tasksFolder);
	const currentDateFolder = await createFolderIfNoExists(app,
		`${rootTaskFolder.path}/${getCurrentDateFolderName()}`
	);
	// fixme создать ямл структуру

	// если такая задача уже есть подсветить красным и запретить создавать
	const fileNameTitle = getFileNameFromTemplate(data.title);

	return await createTaskFile(fileNameTitle, currentDateFolder, app);
}

function getCurrentDateFolderName(): string {
	return format(new Date(), 'yyyy-MM-dd');
}

async function createFolderIfNoExists(app: App, path: string): Promise<TFolder> {
	const value = await app.vault.adapter.exists(path);
	if (!value) {
		return app.vault.createFolder(path);
	}
	return app.vault.getFolderByPath(path) as TFolder;
}

function getFileNameFromTemplate(title: string): string {
	const currentUnixTime = Date.now();
	return `${currentUnixTime} - ${title}.md`;
}

async function createTaskFile(title: string, folder: TFolder, app: App): Promise<TFile> {
	return app.vault.create(`/${folder.path}/${title}`, "")
}
