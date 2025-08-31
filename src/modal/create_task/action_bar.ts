import TaskManagerPlugin from "../../main";
import {setIcon} from "obsidian";

interface TaskActionBarProps {
	container: HTMLElement,
	plugin: TaskManagerPlugin
}

export function createTaskActionBar(props: TaskActionBarProps): void {
	props.container.createDiv({
			cls: "action-bar",
			attr: {
				style: "display: flex;"
			}
		},
		actionBarContainer => {
			createIconButton("menu-button", "tornado", actionBarContainer)
			createLineSeparator(actionBarContainer);
			createIconButton("status-button", "thermometer", actionBarContainer);
			createIconButton("priority-button", "flame", actionBarContainer);
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
