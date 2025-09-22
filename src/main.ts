import { Plugin } from "obsidian";
import { DEFAULT_SETTINGS, TaskManagerSettings, TaskManagerSettingsTab } from "./settings/settings";
import CreateTaskModal from "./components/modal/createtask";

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
		//todo const loadedSettings = await this.loadSettings();

		return {
			...DEFAULT_SETTINGS,
			//  ...loadedSettings
		}
	}
}

