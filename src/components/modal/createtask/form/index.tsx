import { ChangeEvent, ReactElement, UIEvent, useState } from "react";
import TaskManagerPlugin from "../../../../main";
import { ActionBar } from "../actionbar/ActionBar";
import { ExpandedForm, ExpandedProps } from "./Expanded";
import { StatusesProps } from "../actionbar/buttons/Statuses";
import { PrioritiesProps } from "../actionbar/buttons/Priorities";
import { DeadlineSelectorProps } from "../actionbar/buttons/deadline/DeadlineSelector";

interface CreateTaskFormProps {
	plugin: TaskManagerPlugin;
	titleOnchange: (e: ChangeEvent<HTMLInputElement>) => void;
	onSave: (eventButton: UIEvent<HTMLButtonElement>) => void;
	statusesProps: StatusesProps;
	prioritiesProps: PrioritiesProps;
	expandedProps: ExpandedProps;
	deadlineSelectorProps: DeadlineSelectorProps;
}

export function CreateTaskForm(props: CreateTaskFormProps): ReactElement {
	const [isExpanded, setIsExpanded] = useState(false);
	const handleExpandClick = (): void => {
		setIsExpanded(!isExpanded)
	};

	return <>
		<div className="task-form">
			<div className="form-field">
				<label className="form-label">Title</label>
				<input type="text" spellCheck="false"
					placeholder="Enter task title..."
					className="form-input"
					style={{ width: '100%' }}
					onChange={props.titleOnchange}
					autoFocus={true}
				/>
			</div>

			<ActionBar
				plugin={props.plugin}
				expandComponentProps={{
					isExpanded: isExpanded,
					onClick: handleExpandClick
				}}
				statusesProps={props.statusesProps}
				prioritiesProps={props.prioritiesProps}
				deadlineSelectorProps={props.deadlineSelectorProps}
			/>
			{isExpanded && <ExpandedForm {...props.expandedProps} />}

			<div className="form-actions">
				<button className="mod-cta task-manager-button" onClick={props.onSave}>Save</button>
			</div>
		</div>
	</>;
}
