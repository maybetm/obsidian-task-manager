import TaskManagerPlugin from "../main";
import * as React from "react";

export enum SettingTabType {
	MAIN,
	STATUS,
	PRIORITY,
}

export interface SettingTab {
	id: SettingTabType;
	title: string;
	getContentComponent: GetContentComponent;
}

export interface GetContentComponentProps {
	plugin: TaskManagerPlugin
}

export type GetContentComponent = React.FC<GetContentComponentProps>;

