import { App, Modal } from "obsidian";
import TaskManagerPlugin from "../../../main";
import { createRoot, Root } from "react-dom/client";
import { CreateTaskForm } from "./form";
import { AppProvider } from "../../../AppContext";
import { UIEvent } from "react";
import { createTask } from "../../../services/createtask/CreateTask";
import { validateSchema } from "../../../services/Validator";
import { CREATE_TASK_VALIDATION_SCHEMA, CreateTaskData } from "../../../services/createtask/type";
import { DateTime } from "../../../types";
import { DateTimeBase } from "../../../types/DateTimeBase";

export default class CreateTaskModal extends Modal {
	private readonly plugin: TaskManagerPlugin;

	private title: string;
	private tags: string[] = [];
	private linkedTasks: string[] | null;
	private body: string | null;
	private description: string | null;
	private currentStatusValue = "open";
	private currentPriorityValue = "normal";
	private deadlineDateTime: DateTime = { date: "", time: "" };

	private rootContainer: Root;

	constructor(app: App, plugin: TaskManagerPlugin) {
		super(app);
		this.plugin = plugin;
	}

	onOpen() {
		const { contentEl } = this;
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
						onItemSelect: value => this.currentStatusValue = value
					}}
					expandedProps={{
						onChangeDescription: value => this.description = value,
						onChangeTaskBody: value => this.body = value
					}}
					onSave={eventButton => this.onSave(eventButton)}
					plugin={this.plugin}
					titleOnchange={e => this.title = e.currentTarget.value}
					deadlineSelectorProps={{
						dateTime: this.deadlineDateTime,
						onDeadlineChange: dateTime => this.deadlineDateTime = dateTime,
					}}
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
			linkedTasks: this.linkedTasks,
			deadline: new DateTimeBase(this.deadlineDateTime),
		};

		if (!validateSchema(CREATE_TASK_VALIDATION_SCHEMA, createTaskData).isValid) {
			return;
		}

		const createdFile = await createTask(createTaskData, this.app, this.plugin);
		if (this.containerEl.isConnected) {
			this.close();
			await this.app.workspace.getLeaf(false).openFile(createdFile)
		}
	}

	onClose() {
		this.rootContainer.unmount()
	}

}
