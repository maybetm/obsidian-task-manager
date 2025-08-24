import {Setting} from "obsidian";
import {RenderTabProcessor} from "../types";
import TaskManagerPlugin from "../../main";

export interface TaskManagerSettings {
	tasksFolder: string
}

export const DEFAULT_SETTINGS: TaskManagerSettings = {
	tasksFolder: "tasks"
}

export const renderMainTab: RenderTabProcessor = (containerEl: HTMLElement, plugin: TaskManagerPlugin): void => {
	new Setting(containerEl)
		.setName('Tasks folder')
		.setDesc('Default folder for created tasks')
		.addText((text) =>
			text
				.setPlaceholder('task_folder')
				.setValue(DEFAULT_SETTINGS.tasksFolder)
				.onChange(async value => {
					plugin.settings.tasksFolder = value;
				})
		);
}
