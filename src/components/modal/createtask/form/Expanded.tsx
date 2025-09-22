import { ReactElement } from "react";

export interface ExpandedProps {
	onChangeDescription: (value: string) => void;
	onChangeTaskBody: (value: string) => void;
}

export function ExpandedForm(props: ExpandedProps): ReactElement {
	return <>
		<div className="form-field">
			<label className="form-label">Description</label>
			<textarea spellCheck="false"
				placeholder="Enter task description..."
				className="form-textarea"
				style={{ width: "100%" }}
				onChange={event => props.onChangeDescription(event.currentTarget.value)}
			/>
		</div>

		<div className="form-field">
			<label className="form-label">Task body</label>
			<textarea spellCheck="false"
				placeholder="Enter markdown, obsidian like task body..."
				className="form-textarea"
				style={{ width: "100%" }}
				onChange={event => props.onChangeTaskBody(event.currentTarget.value)}
			/>
		</div>
	</>
}
