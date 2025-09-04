import {createIconButton} from "../utils";
import {setIcon} from "obsidian";

interface ExpandComponentProps {
	onClick: () => void;
}

enum ExpandComponentState {
	CLOSED = "CLOSED",
	OPENED = "OPENED",
}

export function createExpandComponent(actionBarContainer: HTMLElement, props: ExpandComponentProps) {
	const button = createIconButton("menu-button", "cloud-fog", actionBarContainer);
	button.dataset.state = ExpandComponentState[ExpandComponentState.CLOSED]

	button.onClickEvent(ev => {
		const isClosed = button.dataset.state === ExpandComponentState.CLOSED;
		const span = button.querySelector('span') as HTMLElement;

		button.dataset.state = isClosed ? ExpandComponentState.OPENED : ExpandComponentState.CLOSED;
		setIcon(span, isClosed ? 'cloud' : 'cloud-fog');

		props.onClick();
	})
}
