import { ReactElement, useCallback, useState } from "react";
import { CalendarClock } from "lucide-react";
import { useCallbackOnKetPressed } from "../../../../../utils";
import { DeadlineModal } from "./DeadlineModal";
import { useApp } from "../../../../../../AppContext";
import { DateTime } from "../../../../../../types";

const hasSelectedDateIconColor = "var(--color-accent)";

export interface DeadlineSelectorProps {
	dateTime: DateTime;
	onDeadlineChange: (dateTime: DateTime) => void;
}

export function DeadlineSelector(props: DeadlineSelectorProps): ReactElement {
	const [dateTime, setDateTime] = useState<DateTime>(props.dateTime);
	const { app, plugin } = useApp()

	const onChange = useCallback((dateTime: DateTime): void => {
		props.onDeadlineChange(dateTime);
		setDateTime(dateTime);
	}, [props.onDeadlineChange, setDateTime]);

	const handleOnClick = useCallback(() => {
		new DeadlineModal(
			app,
			plugin,
			{ dateTime: dateTime, onChange: onChange, onSelect: onChange }
		).open()
	}, [app, plugin, dateTime, onChange]);

	return <>
		<div
			className="quick-actions-icon"
			tabIndex={0}
			role="button"
			onClick={event => handleOnClick()}
			onKeyDown={useCallbackOnKetPressed(event => handleOnClick())}
		>
			<span>
				<CalendarClock height={18}
					style={{ color: dateTime.date ? hasSelectedDateIconColor : "currentColor" }}/>
			</span>
		</div>
	</>
}
