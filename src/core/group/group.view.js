import View from 'core/view/view';
import Command from 'core/infrastructure/command';
import {flatView as nodeFlatView} from 'core/node/node.service';
import {getFactory as valueFactory} from 'core/services/value';

export default class GroupView extends View {
	constructor(model) {
		super(model);

		this.valueFactory = valueFactory;
		this.toggleStatus = new Command({
			execute: node => {
				node.state.expand = !node.state.expand;
				const view = model.view;
				const nodes = view().nodes;
				view({rows: nodeFlatView(nodes)});
			},
			canExecute: node => node.type === 'group'
		});
	}


	count(node) {
		return node.children.length || node.rows.length;
	}

	status(node) {
		return node.state.expand ? 'expand' : 'collapse';
	}

	offset(node) {
		const groupColumn = (this.model.view().columns[0] || []).find(c => c.model.type === 'group');
		if(groupColumn){
			return groupColumn.model.offset * node.level;
		}

		return 0;
	}

	value(node) {
		return node.key;
	}
}