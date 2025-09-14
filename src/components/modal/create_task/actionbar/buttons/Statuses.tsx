import * as React from "react";
import { ReactElement, useState } from "react";
import { Thermometer } from "lucide-react";
import { useApp } from "../../../../../AppContext";
import { Menu, MenuItemProps } from "../../../../obsidian/wrapper/menu/Menu";

export interface StatusesProps {
	selectedItem: string
	onItemSelect: (selectedItem: string) => void
}

export function Statuses(props: StatusesProps): ReactElement {
	const {plugin} = useApp();
	const [selectedItem, setSelectedItem] = useState(props.selectedItem);

	return <>
		<Menu
			selectedItem={selectedItem}
			icon={<Thermometer height={18}/>}
			items={plugin.settings.statuses as MenuItemProps[]}
			onItemSelect={(item) => {
				props.onItemSelect(item.value);
				setSelectedItem(item.value);
			}}
		/>
	</>
}
