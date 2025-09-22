import { cloneElement, CSSProperties, KeyboardEvent, ReactElement, useCallback } from "react";

export function coloredIcon(icon: ReactElement, color: string) {
	return cloneElement(icon, { color: color } as Partial<CSSProperties>)
}

export function useCallbackOnKetPressed<T extends HTMLElement>(callback: (event: KeyboardEvent<T>) => void) {
	return useCallback((event: KeyboardEvent<T>) => {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			callback(event)
		}
	}, [callback]);
}
