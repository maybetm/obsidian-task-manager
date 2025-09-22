import { format } from "date-fns/format";
import { DateTime } from "../types";

export class DateTimeBase implements DateTime {
	readonly date: string;
	readonly time: string;

	constructor(dateTime: DateTime) {
		this.date = dateTime.date;
		this.time = dateTime.time;
	}

	public toDate(): Date {
		return new Date(`${this.date}T${this.time}`);
	}

	public toString(pattern = "yyyy-MM-dd HH:mm"): string {
		return format(this.toDate(), pattern);
	}
}
