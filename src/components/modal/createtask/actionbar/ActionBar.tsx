import { ReactElement } from "react";
import TaskManagerPlugin from "../../../../main";
import { Priorities, PrioritiesProps } from "./buttons/Priorities";
import { Statuses, StatusesProps } from "./buttons/Statuses";
import { ExpandComponent, ExpandComponentProps } from "./buttons/Expand";
import { DeadlineSelector, DeadlineSelectorProps } from "./buttons/deadline/DeadlineSelector";

interface ActionBarProps {
	plugin: TaskManagerPlugin;
	expandComponentProps: ExpandComponentProps;
	statusesProps: StatusesProps;
	prioritiesProps: PrioritiesProps;
	deadlineSelectorProps: DeadlineSelectorProps;
}

export function ActionBar(props: ActionBarProps): ReactElement {
	return (
		<div className="action-bar" style={{ display: "flex" }}>
			<ExpandComponent {...props.expandComponentProps} />
			<LineSeparator/>
			<Statuses {...props.statusesProps}/>
			<Priorities {...props.prioritiesProps}/>
			<DeadlineSelector {...props.deadlineSelectorProps}/>
		</div>
	)
}

export function LineSeparator(): ReactElement {
	return (
		<div className="quick-actions-icon-separator" style={{ alignContent: "center" }}>
				<span className="form-icon-menu-separator" style={{
					display: "inline-block",
					borderLeft: "1px solid rgb(204, 204, 204)",
					height: "18px",
					margin: "0px 10px",
				}}/>
		</div>
	)
}
