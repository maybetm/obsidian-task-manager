import { Menu, MenuItem, MenuPositionDef } from "obsidian";
import { ReactElement } from "react";
import { createRoot, Root } from "react-dom/client";

export interface ObsidianMenuProps<Data> {
	position: MenuPositionDef;
	onIemSelected: (menuItem: MenuItem, dataItem: Data) => void;
	dataItems: Array<Data>
	renderItem: (menuItem: MenuItem, dataItem: Data) => ReactElement
}

export function ObsidianMenu<Data>(props: ObsidianMenuProps<Data>): void {
	const menu = new Menu()
	props.dataItems.forEach((dataItem) => {
		menu.addItem(menuItem => {
			queueMicrotask(() => {
				menuItem.onClick((event: MouseEvent | KeyboardEvent) => props.onIemSelected(menuItem, dataItem))
				createRootAndRender(menuItem, dataItem, props.renderItem,)
			});
		})
	})
	menu.showAtPosition(props.position)
}

function createRootAndRender<Data>(
	menuItem: MenuItem,
	dataItem: Data,
	renderItem: (menuItem: MenuItem, itemRaw: Data) => ReactElement
): [HTMLElement, Root] {
	const itemElement = getItemHtmlElement(menuItem);
	const root = createRoot(itemElement)
	root.render(renderItem(menuItem, dataItem))

	return [itemElement, root]
}

function getItemHtmlElement(menuItem: MenuItem): HTMLElement {
	const el = (menuItem as any).dom as HTMLElement;
	if (!el) {
		throw new Error(`Unable to find dom for item: ${menuItem}`);
	}

	return el
}
