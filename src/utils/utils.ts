import {randomUUID, UUID} from "crypto";
import {format} from "date-fns/format";
import {stringify} from "yaml";

export const DATE_TIME_FORMAT_WITH_TIME_ZONE = "yyyy-MM-dd'T'HH:mm:ss.sss XXX";
export const DATE_TIME_FORMAT = "yyyy-MM-dd HH:mm:ss";
export const DATE_FORMAT = "yyyy-MM-dd";

export function createRandomUUID(): UUID {
	return randomUUID();
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

export function createYamlProperties(taskData: object): string {
	return `---\n${stringify(taskData).trim()}\n---`;
}
