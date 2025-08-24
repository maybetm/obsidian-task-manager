import {App, ButtonComponent, Modal, TextAreaComponent, TextComponent} from "obsidian";
import TaskManagerPlugin from "../../main";
import {createTask, CreateTaskData} from "../../services/create_task";

export default class CreateTaskModal extends Modal {
	private readonly plugin: TaskManagerPlugin;

	private title: string;
	private tags: string[] = [];
	private body: string;
	private description: string;

	constructor(app: App, plugin: TaskManagerPlugin) {
		super(app);
		this.plugin = plugin;
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
			.onChange(async value => this.title = value);

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
			})
			.onChange(async value => this.description = value);

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
			})
			.onChange(async value => this.body = value);

		const buttonContainer = form.createDiv({cls: 'form-actions'});

		new ButtonComponent(buttonContainer)
			.setButtonText('Save')
			.setCta()
			.onClick(async () => {
				const createTaskData = {
					title: this.title,
					tags: this.tags,
					body: this.body,
					description: this.description
				} as CreateTaskData;

				const createdFile = await createTask(createTaskData, this.app, this.plugin);
				if (this.containerEl.isConnected) {
					this.close();
					await this.app.workspace.getLeaf(false).openFile(createdFile)
				}
			});
	}
}



