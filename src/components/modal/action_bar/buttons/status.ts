import {ContextMenu, ContextMenuItem} from "../../../context_menu";
import TaskManagerPlugin from "../../../../main";
import {createIconButton, getCurrentActionColor} from "../utils";

interface StatusButtonProps {
	plugin: TaskManagerPlugin,
	getCurrentStatusValue: () => string;
	onSelectStatusButton: (value: string) => void,
}

export function createStatusButton(actionBarContainer: HTMLElement, props: StatusButtonProps): HTMLElement {
	const statusBtn = createIconButton("status-button", "thermometer", actionBarContainer);
	statusBtn.style.color = getCurrentActionColor(
		props.getCurrentStatusValue(),
		props.plugin.settings.statuses as ContextMenuItem[]
	)
	statusBtn.onClickEvent(ev => {
		new ContextMenu({
			parentActionIcon: "thermometer",
			currentValue: props.getCurrentStatusValue(),
			onSelect: contextMenuItem => {
				statusBtn.style.color = contextMenuItem.color
				props.onSelectStatusButton(contextMenuItem.value);
			},
			plugin: props.plugin,
			menuItems: props.plugin.settings.statuses as ContextMenuItem[]
		}).showAtElement(ev.currentTarget as HTMLElement)
	});

	return statusBtn;
}
