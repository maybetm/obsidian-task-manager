import {Plugin} from "obsidian";
import {TaskManagerSettingsTab} from "./settings/settings";
import CreateTaskModal from "./modal/create_task";
import {DEFAULT_SETTINGS, TaskManagerSettings} from "./settings/tabs/main";

export default class TaskManagerPlugin extends Plugin {
	settings: TaskManagerSettings

	async onload() {
		this.settings = await this.initSettings()

		this.addRibbonIcon('notebook-pen', 'Create task', () => {
			new CreateTaskModal(this.app, this).open()
		});

		this.addSettingTab(new TaskManagerSettingsTab(this.app, this));
	}

	private async initSettings(): Promise<TaskManagerSettings> {
		//const loadedSettings = await this.loadSettings();

		return {
			...DEFAULT_SETTINGS,
			//  ...loadedSettings
		}
	}
}
