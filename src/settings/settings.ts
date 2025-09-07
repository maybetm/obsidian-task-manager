import { App, Plugin, PluginSettingTab } from "obsidian";
import TaskManagerPlugin from "../main";
import { DEFAULT_MAIN_SETTINGS, MainSettings, MainTabComponent } from "./tabs/MainTab";
import { SettingTab, SettingTabType } from "./types";
import { DEFAULT_STATUSES_SETTINGS, StatusSettingComponent, StatusSettingItem } from "./tabs/StatusesTab";
import { DEFAULT_PRIORITIES_SETTINGS, PriorityComponent, PrioritySetting } from "./tabs/PrioritiesTab";
import { createRoot, Root } from "react-dom/client";
import * as React from "react";

export interface TaskManagerSettings {
	main: MainSettings
	priorities: PrioritySetting[]
	statuses: StatusSettingItem[]
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
	{id: SettingTabType.MAIN, title: "Main", getContentComponent: MainTabComponent},
	{id: SettingTabType.STATUS, title: "Statuses", getContentComponent: StatusSettingComponent},
	{id: SettingTabType.PRIORITY, title: "Priorities", getContentComponent: PriorityComponent},
];

export class TaskManagerSettingsTab extends PluginSettingTab {
	plugin: TaskManagerPlugin

	private tabContainer: SettingTabsContainer;
	private rootContainer: Root;

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

		this.rootContainer = createRoot(this.tabContainer.content)

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
		this.activeButtonTab(activeTab.id);
		this.rootContainer.render(React.createElement(activeTab.getContentComponent, {
			plugin: this.plugin
		}));
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
