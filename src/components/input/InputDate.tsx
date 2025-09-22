import { useCallbackOnKetPressed } from "../utils";

export interface InputDateProps {
	onChange: (date: string) => void;
	autofocus?: boolean;
	value: string;
}

export function InputDate(props: InputDateProps) {
	const onClick = (event: HTMLInputElement) => event.showPicker();

	return <>
		<input type="date" className="input-date" autoFocus={!!props.autofocus}
			onChange={event => props.onChange(event.currentTarget.value)}
			onClick={event => onClick(event.currentTarget)}
			onKeyDown={useCallbackOnKetPressed<HTMLInputElement>(event => onClick(event.currentTarget))}
			value={props.value}
		/>
	</>
}
