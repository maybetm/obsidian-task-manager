import {App, Plugin, PluginSettingTab} from "obsidian";
import TaskManagerPlugin from "../main";
import {renderMainTab, MainSettings, DEFAULT_MAIN_SETTINGS} from "./tabs/main";
import {SettingTab, SettingTabType} from "./types";
import {DEFAULT_STATUSES_SETTINGS, renderStatusesTab, StatusesSettings} from "./tabs/statuses";
import {DEFAULT_PRIORITIES_SETTINGS, PrioritiesSettings, renderPrioritiesTab} from "./tabs/priorities";

export interface TaskManagerSettings {
	main: MainSettings
	priorities: PrioritiesSettings[]
	statuses: StatusesSettings[]
}

export const DEFAULT_SETTINGS: TaskManagerSettings = {
	main: DEFAULT_MAIN_SETTINGS,
	priorities: DEFAULT_PRIORITIES_SETTINGS,
	statuses: DEFAULT_STATUSES_SETTINGS
}

interface SettingTabsContainer {
	/**
	 * Контейнер для заголовков вкладок
	 */
	header: HTMLDivElement;
	/**
	 * Контейнер для содержимого вкладок
	 */
	content: HTMLDivElement;
}

const SETTING_TABS: SettingTab[] = [
	{id: SettingTabType.MAIN, title: "Main", render: renderMainTab},
	{id: SettingTabType.STATUS, title: "Statuses", render: renderStatusesTab},
	{id: SettingTabType.PRIORITY, title: "Priorities", render: renderPrioritiesTab},
];

export class TaskManagerSettingsTab extends PluginSettingTab {
	plugin: TaskManagerPlugin

	private tabContainer: SettingTabsContainer;

	constructor(app: App, plugin: Plugin) {
		super(app, plugin);
	}

	display() {
		const {containerEl} = this;
		containerEl.empty();

		this.tabContainer = {
			header: containerEl.createDiv('settings-tab-headers'),
			content: containerEl.createDiv('settings-tab-content')
		}

		SETTING_TABS.forEach(tab => {
			const tabButton = this.tabContainer.header.createEl('button', {
				cls: 'settings-tab-header',
				text: tab.title
			}, (el) => el.dataset.id = SettingTabType[tab.id]);

			this.plugin.registerDomEvent(tabButton, 'click', () => {
				this.activateTab(tab);
			});
		});

		this.activateTab(SETTING_TABS[0]);
	}

	private activateTab(activeTab: SettingTab) {
		this.tabContainer.content.empty();
		this.activeButtonTab(activeTab.id);
		activeTab.render(this.tabContainer.content, this.plugin)
	}

	private activeButtonTab(activeTabId: SettingTabType) {
		this.tabContainer.header.findAll("button").forEach(value => {
			value.removeClass("is-active");

			const rawId: string | undefined = value.dataset.id;
			if (rawId && rawId === SettingTabType[activeTabId]) {
				value.addClass("is-active");
			}
		});
	}

}
