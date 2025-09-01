import {RenderTabProcessor} from "../types";
import TaskManagerPlugin from "../../main";
import {ButtonComponent} from "obsidian";

export interface StatusesSettings {
	value: string,
	label: string,
	color: string,
	isCompleted: boolean
}

export const DEFAULT_STATUSES_SETTINGS: StatusesSettings[] = [
	{value: "none", label: "None", color: "#CCCCCC", isCompleted: false},
	{value: "open", label: "Open", color: "#808080", isCompleted: false},
	{value: "in-progress", label: "In progress", color: "#0066CC", isCompleted: false},
	{value: "closed", label: "Closed", color: "#00AA00", isCompleted: true}
]

export const renderStatusesTab: RenderTabProcessor = (containerEl: HTMLElement, plugin: TaskManagerPlugin): void => {
	const rootStatusesTab = containerEl.createDiv("root-statuses-tab");
	const table = rootStatusesTab.createEl("table", {}, (el) => {
		el.innerHTML = `
			<thead>
				<tr>
					<th>VALUE</th>
					<th>DISPLAY LABEL</th>
					<th>COLOR</th>
					<th>IS COMPLETED</th>
				</tr>
			</thead>
	`
	});

	table.createEl("tbody", {}, (el: HTMLTableSectionElement) => {
		const renderRow = (settings: StatusesSettings, row: HTMLTableRowElement): void => {
			row.insertCell().textContent = settings.value;
			row.insertCell().textContent = settings.label;
			row.insertCell().innerHTML = `<input type="color" value="${settings.color}">`;
			row.insertCell().innerHTML = `<input type="checkbox" ${settings.isCompleted && "checked" || ""}>`
		};

		DEFAULT_STATUSES_SETTINGS.forEach(it => renderRow(it, el.insertRow()))
	});

	rootStatusesTab.createDiv({cls: 'form-actions'}, containerEl => {
		new ButtonComponent(containerEl)
			.setButtonText('Add new status')
	});
}

