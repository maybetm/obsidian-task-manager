import { ReactElement } from "react";
import { useCallbackOnKetPressed } from "../utils";

export interface InputTimeProps {
	onChange: (time: string) => void;
	value: string | undefined;
	disabled?: boolean;
}

export function InputTime(props: InputTimeProps): ReactElement {
	const onClick = (event: HTMLInputElement) => event.showPicker();

	return <>
		<input type="time"
			className="input-time"
			value={props.value}
			onChange={event => props.onChange(event.currentTarget.value)}
			onClick={event => onClick(event.currentTarget)}
			onKeyDown={useCallbackOnKetPressed<HTMLInputElement>(event => onClick(event.currentTarget))}
			disabled={!!props.disabled}
		/>
	</>
}
