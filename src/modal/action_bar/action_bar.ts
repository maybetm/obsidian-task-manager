import TaskManagerPlugin from "../../main";
import {App} from "obsidian";
import {createStatusButton} from "./buttons/status";
import {createPriorityButton} from "./buttons/priority";
import {createIconButton} from "./utils";

interface TaskActionBarProps {
	container: HTMLElement,
	plugin: TaskManagerPlugin,
	app: App,
	getCurrentStatusValue: () => string;
	getCurrentPriorityValue: () => string;
	onSelectStatusButton: (value: string) => void,
	onSelectPriorityButton: (value: string) => void,
}

export function createTaskActionBar(props: TaskActionBarProps): void {
	const actionBarContainer = props.container.createDiv({
		cls: "action-bar",
		attr: {
			style: "display: flex;"
		}
	});

	createIconButton("menu-button", "tornado", actionBarContainer)
	createLineSeparator(actionBarContainer);

	createStatusButton(actionBarContainer, {
		getCurrentStatusValue: props.getCurrentStatusValue,
		plugin: props.plugin,
		onSelectStatusButton: props.onSelectStatusButton
	})

	createPriorityButton(actionBarContainer,{
		getCurrentPriorityValue: props.getCurrentPriorityValue,
		plugin: props.plugin,
		onSelectPriorityButton: props.onSelectPriorityButton
	})
}

function createLineSeparator(icons: HTMLDivElement) {
	const styles: Partial<CSSStyleDeclaration> = {
		display: 'inline-block',
		borderLeft: '1px solid #ccc',
		margin: '0px 10px',
		height: '18px'
	};

	icons.createDiv("quick-actions-icon-separator", el => {
		el.createSpan("form-icon-menu-separator", el => Object.assign(el.style, styles));
	})
}

