import { App, Modal } from "obsidian";
import { createRoot, Root } from "react-dom/client";
import { AppProvider } from "../../../../../../AppContext";
import TaskManagerPlugin from "../../../../../../main";
import { DeadlineForm, DeadlineFormProps } from "./DeadlineForm";

export class DeadlineModal extends Modal {

	private readonly plugin: TaskManagerPlugin;
	private readonly deadlineFormProps: DeadlineFormProps;

	private rootContainer: Root;

	constructor(app: App, plugin: TaskManagerPlugin, deadlineFormProps: DeadlineFormProps) {
		super(app);
		this.plugin = plugin;
		this.deadlineFormProps = deadlineFormProps
	}

	onOpen() {
		const { contentEl } = this;
		contentEl.empty();

		this.modalEl.setCssStyles({
			width: '480px',
		})

		this.rootContainer = createRoot(contentEl)
		this.rootContainer.render(
			<AppProvider app={this.app} plugin={this.plugin}>
				<DeadlineForm
					dateTime={this.deadlineFormProps.dateTime}
					onChange={this.deadlineFormProps.onChange}
					onSelect={dateTime => {
						this.deadlineFormProps.onSelect(dateTime);
						this.close();
					}}
				/>
			</AppProvider>
		)
	}

	onClose() {
		this.rootContainer.unmount()
	}
}
