import {App, Plugin, PluginSettingTab, Setting} from "obsidian";
import TaskManagerPlugin from "../main";

export interface TaskManagerSettings {
	tasksFolder: string
}

export const DEFAULT_SETTINGS: TaskManagerSettings = {
	tasksFolder: "tasks"
}

export class TaskManagerSettingsTab extends PluginSettingTab {

	plugin: TaskManagerPlugin

	constructor(app: App, plugin: Plugin) {
		super(app, plugin);
	}

	display() {
		const {containerEl} = this;

		containerEl.empty();

		this.renderDefaultPageTab();
	}

	private renderDefaultPageTab(): void {
		const {containerEl} = this;

		new Setting(containerEl)
			.setName('Tasks folder')
			.setDesc('Default folder for created tasks')
			.addText((text) =>
				text
					.setPlaceholder('task_folder')
					.setValue(DEFAULT_SETTINGS.tasksFolder)
					.onChange(async value => {
						this.plugin.settings.tasksFolder = value;
					})
			);
	}
}
