import { ReactElement, UIEvent, useState } from "react";
import { coloredIcon, useCallbackOnKetPressed } from "../../../utils";
import { ObsidianMenu } from "./ObsidianMenu";

export const selectedSymbol = "✓";

export interface MenuProps {
	selectedItem: string;
	items: MenuItemProps[];
	icon: ReactElement;
	onItemSelect: (item: MenuItemProps) => void;
}

export interface MenuItemProps {
	value: string;
	label: string;
	color: string;
}

export function Menu(props: MenuProps): ReactElement {
	const [isOpen, setIsOpen] = useState(false);
	const menuItems = props.items;
	const selectedItem = menuItems.find(value => value.value === props.selectedItem) as NonNullable<MenuItemProps>
	const onItemSelect = (item: MenuItemProps) => {
		props.onItemSelect(item);
		setIsOpen(false);
	}

	const handleTriggerClick = (event: UIEvent<HTMLDivElement>) => {
		event.stopPropagation();
		setIsOpen(!isOpen);

		ObsidianMenu({
			position: (({ bottom, left }) => ({
				y: bottom + 4,
				x: left
			}))(event.currentTarget.getBoundingClientRect()),
			onIemSelected: (menuItem, dataItem) => onItemSelect(dataItem),
			dataItems: menuItems,
			renderItem: (menuItem, dataItem) => {
				return <>
					<MenuItem
						icon={coloredIcon(props.icon, dataItem.color)}
						selectedItem={selectedItem}
						menuItem={dataItem}
					/>
				</>
			}
		})
	};

	return <>
		<div className="quick-actions-icon"
			tabIndex={0} role="button"
			onClick={handleTriggerClick}
			onKeyDown={useCallbackOnKetPressed<HTMLDivElement>(event => handleTriggerClick(event))}
		>
			<span>{coloredIcon(props.icon, selectedItem.color)}</span>
		</div>
	</>
}

function MenuItem(props: {
	icon: ReactElement,
	selectedItem: MenuItemProps,
	menuItem: MenuItemProps;
}): ReactElement {
	return <>
		<div style={{ cursor: "pointer", display: "flex" }}>
			<div className="menu-item-icon">{props.icon}</div>
			<div className="menu-item-title">
				{(props.selectedItem.value === props.menuItem.value) && selectedSymbol} {props.menuItem.label}
			</div>
		</div>
	</>;
}
