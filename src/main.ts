import {Plugin} from "obsidian";
import {DEFAULT_SETTINGS, TaskManagerSettings, TaskManagerSettingsTab} from "./settings/settings";
import CreateTaskModal from "./modal/create_task_modal";
import {ExampleView, VIEW_TYPE_EXAMPLE} from "./modal/test_view";

export default class TaskManagerPlugin extends Plugin {

	settings: TaskManagerSettings

	async onload() {
		this.settings = await this.initSettings()

		this.registerView(
			VIEW_TYPE_EXAMPLE,
			(leaf) => new ExampleView(leaf)
		);

		this.addRibbonIcon('dice', 'Create task', () => {
			new CreateTaskModal(this.app).open()
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
