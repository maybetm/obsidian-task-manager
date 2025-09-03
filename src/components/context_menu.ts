import {Menu} from "obsidian";
import TaskManagerPlugin from "../main";
import {ActionIcon} from "../types";

export interface ContextMenuItem {
	value: string
	label: string
	color: string
}

export interface ContextMenuOptions {
	parentActionIcon: ActionIcon
	currentValue: string;
	onSelect: (contextMenuItem: ContextMenuItem) => void;
	plugin: TaskManagerPlugin;
	menuItems: ContextMenuItem[];
}

export class ContextMenu {
	private menu: Menu = new Menu();
	private options: ContextMenuOptions;

	constructor(options: ContextMenuOptions) {
		this.options = options;

		const contextMenuItems = this.options.menuItems;

		contextMenuItems.forEach((option, index) => {
			this.menu.addItem(item => {
				if (option.value === this.options.currentValue) {
					item.setTitle(`✓ ${option.label}`);
				} else {
					item.setTitle(option.label);
				}

				item.setIcon(this.options.parentActionIcon);
				item.onClick(async () => {
					this.options.onSelect(option);
				});

			});
		});
	}

	public showAtElement(actionBarBtn: HTMLElement): void {
		this.menu.showAtPosition({
			x: actionBarBtn.getBoundingClientRect().left,
			y: actionBarBtn.getBoundingClientRect().bottom + 4
		});

		this.applyColorStyling();
	}

	private applyColorStyling(): void {
		const contextMenuItems = this.options.menuItems;
		const menuEl = document.querySelector('.menu');

		if (!menuEl) {
			throw new Error("menu is undefined");
		}

		const menuItems = menuEl.querySelectorAll('.menu-item');
		contextMenuItems.forEach((option, index) => {
			const menuItem = menuItems[index] as HTMLElement;
			if (menuItem && option.color) {
				const iconEl = menuItem.querySelector('.menu-item-icon') as HTMLElement;
				if (iconEl) {
					iconEl.style.color = option.color;
				}
			}
		});
	}

}
