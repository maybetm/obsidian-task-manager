import {createIconButton} from "../utils";

interface ExpandComponentProps {
	onClick: () => void;
}

export function createExpandComponent(actionBarContainer: HTMLElement, props: ExpandComponentProps) {
	createIconButton("menu-button", "tornado", actionBarContainer).onClickEvent(ev => {
		props.onClick();
	})
}
