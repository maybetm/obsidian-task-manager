import {setIcon} from "obsidian";
import {ContextMenuItem} from "../menu/context_menu";

export function createIconButton(className: string, iconName: string, container: HTMLElement): HTMLElement {
	return container.createDiv({cls: "quick-actions-icon"}, el => {
		el.createSpan({cls: className}, el => setIcon(el, iconName));
	});
}

export function getCurrentActionColor(value: string, menuItems: ContextMenuItem[]): NonNullable<string> {
	return menuItems.find(menuItem => menuItem.value === value)?.color as NonNullable<string>
}
