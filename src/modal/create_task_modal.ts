import {App, Modal, Setting, TextAreaComponent} from "obsidian";

export default class CreateTaskModal extends Modal {
	constructor(app: App) {
		super(app);

		this.setTitle('Create task');

		new TextAreaComponent(this.contentEl)
			.setValue("this.viewModel.content")
			.onChange(value => {
				console.log("test")
			})
			.then(textArea => {
				textArea.inputEl.style.width = "100%";
				textArea.inputEl.rows = 10;
			})

		new Setting(this.contentEl)
			.addButton((btn) =>
				btn
					.setButtonText('Submit')
					.setCta()
					.onClick(() => {
						this.close();
					}));
	}
}
