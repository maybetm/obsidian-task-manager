import { App, Modal } from "obsidian";
import TaskManagerPlugin from "../../../main";
import { createRoot, Root } from "react-dom/client";
import { CreateTaskForm } from "./form";
import { AppProvider } from "../../../AppContext";
import { UIEvent } from "react";
import { createTask, CreateTaskData } from "../../../services/create_task";

export default class CreateTaskModal extends Modal {
	private readonly plugin: TaskManagerPlugin;

	private title: string;
	private tags: string[] = [];
	private linkedTasks: string[] | null;
	private body: string | null;
	private description: string | null;
	private currentStatusValue = "open";
	private currentPriorityValue = "normal";

	private rootContainer: Root;

	constructor(app: App, plugin: TaskManagerPlugin) {
		super(app);
		this.plugin = plugin;
	}

	onOpen() {
		const {contentEl} = this;
		contentEl.empty();

		this.setTitle('Create task');
		this.rootContainer = createRoot(contentEl)
		this.rootContainer.render(
			<AppProvider app={this.app} plugin={this.plugin}>
				<CreateTaskForm
					prioritiesProps={{
						selectedItem: this.currentPriorityValue,
						onItemSelect: value => this.currentPriorityValue = value
					}}
					statusesProps={{
						selectedItem: this.currentStatusValue,
						onItemSelect: value => this.currentPriorityValue = value
					}}
					expandedProps={{
						onChangeDescription: value => this.description = value,
						onChangeTaskBody: value => this.body = value
					}}
					onSave={eventButton => this.onSave(eventButton)}
					plugin={this.plugin}
					titleOnchange={e => this.title = e.currentTarget.value}
				/>
			</AppProvider>
		)
	}

	private async onSave(eventButton: UIEvent<HTMLButtonElement>): Promise<void> {
		const createTaskData: CreateTaskData = {
			title: this.title,
			tags: this.tags,
			body: this.body,
			description: this.description,
			status: this.currentStatusValue,
			priority: this.currentPriorityValue,
			linkedTasks: this.linkedTasks
		};

		const createdFile = await createTask(createTaskData, this.app, this.plugin);
		if (this.containerEl.isConnected) {
			this.close();
			await this.app.workspace.getLeaf(false).openFile(createdFile)
		}
	}

}
