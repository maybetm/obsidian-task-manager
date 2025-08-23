import {Plugin} from "obsidian";
import {DEFAULT_SETTINGS, TaskManagerSettings, TaskManagerSettingsTab} from "./settings/settings";
import CreateTaskModal from "./modal/create_task";

export default class TaskManagerPlugin extends Plugin {
	settings: TaskManagerSettings

	async onload() {
		this.settings = await this.initSettings()

		this.addRibbonIcon('notebook-pen', 'Create task', () => {
			new CreateTaskModal(this.app, this).open()
		});

		this.addSettingTab(new TaskManagerSettingsTab(this.app, this));

		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}

	private async initSettings(): Promise<TaskManagerSettings> {
		//const loadedSettings = await this.loadSettings();

		return {
			...DEFAULT_SETTINGS,
			//  ...loadedSettings
		}
	}
}
