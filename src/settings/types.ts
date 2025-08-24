import TaskManagerPlugin from "../main";

export enum SettingTabType {
	MAIN,
	STATUS,
	PRIORITY,
}

export interface SettingTab {
	id: SettingTabType;
	title: string;
	render: RenderTabProcessor;
}

export type RenderTabProcessor = (containerEl: HTMLElement, plugin: TaskManagerPlugin) => void;

