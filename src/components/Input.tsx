import { ChangeEventHandler } from "react";

interface InputItemProps {
	itemName: string,
	description: string,
	onChange: ChangeEventHandler<HTMLInputElement>,
	defaultValue: string
	placeholder: string
}

export const InputComponent = (props: InputItemProps) => {
	return <div className="setting-item">
		<div className="setting-item-info">
			<div className="setting-item-name">{props.itemName}</div>
			<div className="setting-item-description">{props.description}</div>
		</div>
		<div className="setting-item-control">
			<input
				type="text"
				spellCheck="false"
				placeholder={props.placeholder}
				onChange={props.onChange}
				defaultValue={props.defaultValue}
			/>
		</div>
	</div>
}
