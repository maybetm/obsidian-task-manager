import TaskManagerPlugin from "../../../../main";
import {ContextMenu, ContextMenuItem} from "../../../context_menu";
import {createIconButton, getCurrentActionColor} from "../utils";

interface PriorityButtonProps {
	plugin: TaskManagerPlugin,
	getCurrentPriorityValue: () => string;
	onSelectPriorityButton: (value: string) => void,
}

export function createPriorityButton(actionBarContainer: HTMLElement, props: PriorityButtonProps): HTMLElement {
	const priorityBtn = createIconButton("priority-button", "flame", actionBarContainer);
	priorityBtn.style.color = getCurrentActionColor(
		props.getCurrentPriorityValue(),
		props.plugin.settings.priorities as ContextMenuItem[]
	);
	priorityBtn.onClickEvent(ev => {
		new ContextMenu({
			parentActionIcon: "flame",
			currentValue: props.getCurrentPriorityValue(),
			onSelect: contextMenuItem => {
				priorityBtn.style.color = contextMenuItem.color
				props.onSelectPriorityButton(contextMenuItem.value);
			},
			plugin: props.plugin,
			menuItems: props.plugin.settings.priorities as ContextMenuItem[]
		}).showAtElement(ev.currentTarget as HTMLElement)
	});

	return priorityBtn;
}
