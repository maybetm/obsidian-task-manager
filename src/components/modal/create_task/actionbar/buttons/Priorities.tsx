import * as React from "react";
import { ReactElement, useState } from "react";
import { Flame } from "lucide-react";
import { Menu, MenuItemProps } from "../../../../obsidian/wrapper/menu/Menu";
import { useApp } from "../../../../../AppContext";

export interface PrioritiesProps {
	selectedItem: string
	onItemSelect: (selectedItem: string) => void
}

export function Priorities(props: PrioritiesProps): ReactElement {
	const {plugin} = useApp();
	const [selectedItem, setSelectedItem] = useState(props.selectedItem);

	return <>
		<Menu
			selectedItem={selectedItem}
			icon={<Flame height={18}/>}
			items={plugin.settings.priorities as MenuItemProps[]}
			onItemSelect={(item) => {
				props.onItemSelect(item.value)
				setSelectedItem(item.value);
			}}
		/>
	</>
}
