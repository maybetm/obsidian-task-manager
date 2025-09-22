import { ReactElement, useCallback, useEffect, useState } from "react";
import { InputDate } from "../../../../../input/InputDate";
import { InputTime } from "../../../../../input/InputTime";
import { DateTime } from "../../../../../../types";

export interface DeadlineFormProps {
	onSelect: (dateTime: DateTime) => void;
	onChange: (dateTime: DateTime) => void;
	dateTime: DateTime
}

export function DeadlineForm(props: DeadlineFormProps): ReactElement {
	const [dateTime, setDateTime] = useState<DateTime>(props.dateTime);
	const timeDisabled = !dateTime.date;

	const handleDateChange = useCallback((value: string) => {
		const newState = { ...dateTime, date: value }
		setDateTime(newState)
		props.onChange(newState);
	}, [dateTime, props.onChange]);

	const handleTimeChange = useCallback((value: string) => {
		const newState = { ...dateTime, time: value }
		setDateTime(newState)
		props.onChange(newState);
	}, [dateTime, props.onChange]);

	useEffect(() => {
		timeDisabled && handleTimeChange("");
	}, [timeDisabled]);

	return <>
		<div style={{
			display: "inline-flex",
			flexWrap: "wrap",
			rowGap: "10px"
		}}>
			<label>Select the deadline — the last date this task makes sense to complete</label>
			<InputDate value={dateTime.date} autofocus={true} onChange={value => {
				handleDateChange(value);
			}}/>
			<InputTime value={dateTime.time} disabled={timeDisabled} onChange={value => {
				handleTimeChange(value);
			}}/>
		</div>

		<div style={{
			display: "flex",
			justifyContent: "flex-end",
			marginTop: "0.8em",
			paddingTop: "1.2em",
			columnGap: "10px",
			borderTop: "1px solid var(--background-modifier-border)"
		}}>
			<button
				className="task-manager-button"
				onClick={event => handleDateChange("")}>
				Clear
			</button>
			<button className="mod-cta task-manager-button" onClick={event => {
				props.onChange(dateTime);
				props.onSelect(dateTime);
			}}>
				Select
			</button>
		</div>
	</>
}
