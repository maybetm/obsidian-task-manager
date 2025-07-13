import {App, Plugin, PluginSettingTab} from "obsidian";
import {TaskManagerSettings} from "./types";

export const DEFAULT_SETTINGS: TaskManagerSettings = {
	tasksFolder: ""
}

export class TaskManagerSettingsTab extends PluginSettingTab {

	constructor(app: App, plugin: Plugin) {
		super(app, plugin);
	}

	display() {
	}
}
