import TaskManagerPlugin from "../../../main";
import {App} from "obsidian";
import {createStatusButton} from "./buttons/status";
import {createPriorityButton} from "./buttons/priority";
import {createExpandComponent} from "./buttons/expand";

interface TaskActionBarProps {
	plugin: TaskManagerPlugin,
	app: App,
	getCurrentStatusValue: () => string;
	getCurrentPriorityValue: () => string;
	onSelectStatusButton: (value: string) => void,
	onSelectPriorityButton: (value: string) => void,
	expandOnClick: () => void,
}

export function createTaskActionBar(props: TaskActionBarProps): HTMLDivElement {
	const actionBarContainer = document.createElement("div");
	actionBarContainer.className = "action-bar";
	actionBarContainer.setCssStyles({
		display: "flex",
	});

	createExpandComponent(actionBarContainer, {
		onClick: props.expandOnClick,
	});

	createLineSeparator(actionBarContainer);

	createStatusButton(actionBarContainer, {
		getCurrentStatusValue: props.getCurrentStatusValue,
		plugin: props.plugin,
		onSelectStatusButton: props.onSelectStatusButton
	})

	createPriorityButton(actionBarContainer, {
		getCurrentPriorityValue: props.getCurrentPriorityValue,
		plugin: props.plugin,
		onSelectPriorityButton: props.onSelectPriorityButton
	})

	return actionBarContainer;
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

