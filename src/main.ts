import {Notice, Plugin} from "obsidian";
import {TaskManagerSettingsTab} from "./settings/settings";

export default class TaskManagerPlugin extends Plugin {

	async onload() {

		this.addRibbonIcon('dice', 'Greet', () => {
			new Notice('Hello, world!')
		});

		this.addSettingTab(new TaskManagerSettingsTab (this.app, this));

		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}
}
