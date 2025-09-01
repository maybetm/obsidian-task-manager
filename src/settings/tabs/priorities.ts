import {RenderTabProcessor} from "../types";
import TaskManagerPlugin from "../../main";
import {ButtonComponent} from "obsidian";

export interface PrioritiesSettings {
	value: string,
	label: string,
	color: string,
	weight: number
}

export const DEFAULT_PRIORITIES_SETTINGS: PrioritiesSettings[] = [
	{value: "high", label: "High", color: "#C23636", weight: 3},
	{value: "normal", label: "Normal", color: "#FDA900", weight: 2},
	{value: "low", label: "Low", color: "#00A900", weight: 1},
	{value: "none", label: "None", color: "#E8E7E7", weight: 0}
]

export const renderPrioritiesTab: RenderTabProcessor = (containerEl: HTMLElement, plugin: TaskManagerPlugin): void => {
	const rootStatusesTab = containerEl.createDiv("root-priority-tab");
	const table = rootStatusesTab.createEl("table", {}, (el) => {
		el.innerHTML = `
			<thead>
				<tr>
					<th>VALUE</th>
					<th>DISPLAY LABEL</th>
					<th>COLOR</th>
					<th>WEIGHT</th>
				</tr>
			</thead>
	`
	});

	table.createEl("tbody", {}, (el: HTMLTableSectionElement) => {
		const renderRow = (settings: PrioritiesSettings, row: HTMLTableRowElement): void => {
			row.insertCell().textContent = settings.value;
			row.insertCell().textContent = settings.label;
			row.insertCell().innerHTML = `<input type="color" value="${settings.color}">`;
			row.insertCell().innerHTML = `<input type="number" value=${settings.weight}>`
		};

		DEFAULT_PRIORITIES_SETTINGS.forEach(it => renderRow(it, el.insertRow()))
	});

	rootStatusesTab.createDiv({cls: 'form-actions'}, containerEl => {
		new ButtonComponent(containerEl)
			.setButtonText('Add new priority')
	});

}
