import TaskManagerPlugin from "../../main";
import {App, setIcon} from "obsidian";
import {ContextMenuItem, ContextMenu} from "../menu/context_menu";

interface TaskActionBarProps {
	container: HTMLElement,
	plugin: TaskManagerPlugin
	app: App
}

export function createTaskActionBar(props: TaskActionBarProps): void {
	const statusMenuContext = new ContextMenu({
		parentActionIcon: "thermometer",
		currentValue: "open",
		onSelect: val => console.log(val),
		plugin: props.plugin,
		menuItems: props.plugin.settings.statuses as ContextMenuItem[]
	});

	const priorityMenuContext = new ContextMenu({
		parentActionIcon: "flame",
		currentValue: "normal",
		onSelect: val => console.log(val),
		plugin: props.plugin,
		menuItems: props.plugin.settings.priorities as ContextMenuItem[]
	});

	props.container.createDiv({
			cls: "action-bar",
			attr: {
				style: "display: flex;"
			}
		},
		actionBarContainer => {
			createIconButton("menu-button", "tornado", actionBarContainer)
			createLineSeparator(actionBarContainer);

			createIconButton("status-button", "thermometer", actionBarContainer)
				.onClickEvent(ev => statusMenuContext.showAtElement(ev.currentTarget as HTMLElement))

			createIconButton("priority-button", "flame", actionBarContainer)
				.onClickEvent(ev => priorityMenuContext.showAtElement(ev.currentTarget as HTMLElement));
		})
}

function createIconButton(className: string, iconName: string, container: HTMLElement): HTMLElement {
	return container.createDiv({cls: "quick-actions-icon"}, el => {
		el.createSpan({cls: className}, el => setIcon(el, iconName));
	});
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
