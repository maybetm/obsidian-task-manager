import {Menu} from "obsidian";
import TaskManagerPlugin from "../../main";
import {ActionIcon} from "../../types";

export interface ContextMenuItem {
	value: string
	label: string
	color: string
}

export interface ContextMenuOptions {
	parentActionIcon: ActionIcon
	currentValue: string;
	onSelect: (value: string) => void;
	plugin: TaskManagerPlugin;
	menuItems: ContextMenuItem[];
}

export class ContextMenu {
	private menu: Menu = new Menu();
	private options: ContextMenuOptions;

	constructor(options: ContextMenuOptions) {
		this.options = options;
		this.buildMenu();
	}

	private buildMenu(): void {
		const statusOptions = this.options.menuItems;

		statusOptions.forEach((option, index) => {
			this.menu.addItem(item => {
				if (option.value === this.options.currentValue) {
					item.setTitle(`✓ ${option.label}`);
				} else {
					item.setTitle(option.label);
				}

				item.setIcon(this.options.parentActionIcon);
				item.onClick(async () => this.options.onSelect(option.value));
			});
		});
	}

	public showAtElement(element: HTMLElement): void {
		this.menu.showAtPosition({
			x: element.getBoundingClientRect().left,
			y: element.getBoundingClientRect().bottom + 4
		});

		this.applyColorStyling();
	}

	private applyColorStyling(): void {
		const statusOptions = this.options.menuItems;
		const menuEl = document.querySelector('.menu');

		if (!menuEl) return;

		const menuItems = menuEl.querySelectorAll('.menu-item');

		statusOptions.forEach((option, index) => {
			const menuItem = menuItems[index] as HTMLElement;
			if (menuItem && option.color) {
				const iconEl = menuItem.querySelector('.menu-item-icon');
				if (iconEl) {
					(iconEl as HTMLElement).style.color = option.color;
				}
			}
		});
	}

}
