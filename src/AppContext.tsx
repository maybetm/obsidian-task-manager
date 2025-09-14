import { App } from "obsidian";
import TaskManagerPlugin from "./main";
import { createContext, ReactNode, useContext } from "react";

export interface AppContextState {
	app: App;
	plugin: TaskManagerPlugin;
}

export const AppContext = createContext<AppContextState | undefined>(undefined);

export interface AppProviderProps {
	children: ReactNode;
	app: App;
	plugin: TaskManagerPlugin;
}

export function AppProvider(props: AppProviderProps) {
	return (
		<AppContext.Provider value={props}>
			{props.children}
		</AppContext.Provider>
	);
}

export const useApp = (): AppContextState  => {
	const context = useContext(AppContext);

	if (!context) {
		throw new Error('Use "useApp" into AppProvider only.');
	}

	return context;
};
