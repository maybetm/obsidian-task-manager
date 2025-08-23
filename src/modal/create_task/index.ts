import {App, ButtonComponent, Modal, TextAreaComponent, TextComponent, TFile} from "obsidian";
import TaskManagerPlugin from "../../main";
import {createTask} from "./create_task";

export interface CreateTaskModalData {
	title: string;
}

const DEFAULT_CREATE_TASK_MODAL_DATA: CreateTaskModalData = {
	title: '',
}

export default class CreateTaskModal extends Modal {
	private plugin: TaskManagerPlugin;
	private createTaskModalData: CreateTaskModalData;

	constructor(app: App, plugin: TaskManagerPlugin) {
		super(app);
		this.plugin = plugin;
		this.createTaskModalData = DEFAULT_CREATE_TASK_MODAL_DATA
	}

	onOpen() {
		const {contentEl} = this;

		this.setTitle('Create task');
		contentEl.empty();

		const form = contentEl.createDiv({cls: 'task-form'});

		const titleContainer = form.createDiv({cls: 'form-field'});
		titleContainer.createEl('label', {
			text: 'Title',
			cls: 'form-label'
		});

		new TextComponent(titleContainer)
			.setPlaceholder('Enter task title...')
			.then(component => {
				component.inputEl.style.width = '100%';
				component.inputEl.classList.add('form-input');
			})
			.onChange(async value => {
				this.createTaskModalData.title = value
			});

		const descContainer = form.createDiv({cls: 'form-field'});
		descContainer.createEl('label', {
			text: 'Description',
			cls: 'form-label'
		});

		new TextAreaComponent(descContainer)
			.setPlaceholder("Enter task description...")
			.setValue('')
			.then(textArea => {
				textArea.inputEl.style.width = '100%';
				textArea.inputEl.classList.add('form-textarea');
			});

		const markDownTaskBodyContainer = form.createDiv({cls: 'form-field'});
		markDownTaskBodyContainer.createEl('label', {
			text: 'Task body',
			cls: 'form-label'
		});

		new TextAreaComponent(markDownTaskBodyContainer)
			.setPlaceholder("Enter markdown, obsidian like task body...")
			.setValue('')
			.then(textArea => {
				textArea.inputEl.style.width = '100%';
				textArea.inputEl.classList.add('form-textarea');
			});

		const buttonContainer = form.createDiv({cls: 'form-actions'});

		new ButtonComponent(buttonContainer)
			.setButtonText('Save')
			.setCta()
			.onClick(() => createTask(this.createTaskModalData, this.app, this.plugin)
				.then(value => this.close()));
	}
}



