import { GetContentComponent } from "../types";
import { InputComponent } from "../../components/input/InputText";
import * as React from "react";

export interface MainSettings {
	tasksFolder: string
}

export const DEFAULT_MAIN_SETTINGS: MainSettings = {
	tasksFolder: "tasks"
}

export const MainTabComponent: GetContentComponent = (props): React.JSX.Element => {
	return (
		<InputComponent
			itemName={"Tasks folder"}
			description={"Default folder for created tasks"}
			defaultValue={DEFAULT_MAIN_SETTINGS.tasksFolder}
			placeholder={"Enter task folder"}
			onChange={event => props.plugin.settings.main.tasksFolder = event.target.value}
		/>
	);
}


