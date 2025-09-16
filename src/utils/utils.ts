import { format } from "date-fns/format";
import { stringify } from "yaml";
import { UUID } from "../types";
import { v4 as randomUUID } from 'uuid';

export const DATE_TIME_FORMAT_WITH_TIME_ZONE = "yyyy-MM-dd'T'HH:mm:ss.sss XXX";
export const DATE_TIME_FORMAT = "yyyy-MM-dd HH:mm:ss";
export const DATE_FORMAT = "yyyy-MM-dd";

export function createRandomUUID(): UUID {
	return randomUUID() as UUID;
}

export function getCurrentDateTimeWithTimeZone(): string {
	return format(new Date(), DATE_TIME_FORMAT_WITH_TIME_ZONE)
}

export function getTimestampUnixTime(): number {
	return Date.now();
}

export function getCurrentDateTime(): string {
	return format(new Date(), DATE_TIME_FORMAT)
}

export function getCurrentDate(): string {
	return format(new Date(), DATE_FORMAT)
}

export function createYamlProperties(object: object): string {
	return `---\n${stringify(object, {nullStr: "~"}).trim()}\n---`;
}
