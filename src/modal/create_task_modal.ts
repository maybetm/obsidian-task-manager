import {App, ButtonComponent, Modal, TextAreaComponent, TextComponent} from "obsidian";
import {Task} from "../types";
import TaskManagerPlugin from "../main";

export default class CreateTaskModal extends Modal {
	private plugin: TaskManagerPlugin;
	private title: string;

	constructor(app: App, plugin: TaskManagerPlugin) {
		super(app);
		this.plugin = plugin;
	}

	onOpen() {
		const { contentEl } = this;

		this.setTitle('Create task');
		contentEl.empty();

		const form = contentEl.createDiv({ cls: 'task-form' });

		const titleContainer = form.createDiv({ cls: 'form-field' });
		titleContainer.createEl('label', {
			text: 'Title',
			cls: 'form-label'
		});

		new TextComponent(titleContainer)
			.setPlaceholder('Enter task title...')
			.then(component => {
				component.inputEl.style.width = '100%';
				component.inputEl.classList.add('form-input');
			});

		const descContainer = form.createDiv({ cls: 'form-field' });
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

		const markDownTaskBodyContainer = form.createDiv({ cls: 'form-field' });
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

		const buttonContainer = form.createDiv({ cls: 'form-actions' });
		new ButtonComponent(buttonContainer)
			.setButtonText('Save')
			.setCta()
			.onClick(() => this.close());
	}
}


export function createTask(taskInfo: Task): void {

}

