import { isUndefined } from '../../core/utility/kit';
import { Command } from '../../core/command/command';
import { RowEditor } from '../../core/edit/edit.row.editor';
import { Event } from '../../core/infrastructure/event';
import { Disposable } from '../../core/infrastructure/disposable';

export class EditFormPanelView extends Disposable {
	constructor(model, context) {
		super();

		this.model = model;

		this.editor = new RowEditor(context.row, model.columnList().line);
		this.caption = context.caption;

		this.submitEvent = new Event();
		this.cancelEvent = new Event();
		this.resetEvent = new Event();

		this.submit = this.commands.submit;
		this.cancel = this.commands.cancel;
		this.reset = this.commands.reset;

		if (!isUndefined(context.shortcut)) {
			this.using(context.shortcut.register(new Map(
				Object.entries(this.commands)
			)));
		}
	}

	get editors() {
		return this.editor.editors;
	}

	get commands() {
		const commands = {
			submit: new Command({
				source: 'edit.form.panel',
				shortcut: this.shortcutFactory('commit'),
				execute: () => {
					this.editor.commit();
					this.submitEvent.emit();
				}
			}),
			cancel: new Command({
				source: 'edit.form.panel',
				shortcut: this.shortcutFactory('cancel'),
				execute: () => this.cancelEvent.emit()
			}),
			reset: new Command({
				source: 'edit.form.panel',
				execute: () => {
					this.editor.editors.forEach(e => e.reset());
					this.resetEvent.emit();
				}
			})
		};

		return commands;
	}

	shortcutFactory(type) {
		const { edit } = this.model;
		return () => {
			const shortcuts = edit()[type + 'Shortcuts'];
			return shortcuts['reference'] || shortcuts['$default'];
		};
	}
}
