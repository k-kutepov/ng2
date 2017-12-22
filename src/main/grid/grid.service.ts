import { Injectable, NgZone } from '@angular/core';
import { Model } from 'ng2-qgrid/core/infrastructure/model';
import { Action } from 'ng2-qgrid/core/action/action';
import { Command } from 'ng2-qgrid/core/command/command';
import { GridService as GridCoreService } from 'ng2-qgrid/core/services/grid';
import { Pipe } from 'ng2-qgrid/core/pipe/pipe';
import { PipeUnit } from 'ng2-qgrid/core/pipe/pipe.unit';
import { getFactory as valueFactory } from 'ng2-qgrid/core/services/value';
import { getFactory as labelFactory } from 'ng2-qgrid/core/services/label';
import { RowDetailsStatus } from 'ng2-qgrid/core/row-details/row.details.status';
import { Log } from 'ng2-qgrid/core/infrastructure/log';
import { identity, noop } from 'ng2-qgrid/core/utility';
import { setTimeout } from 'timers';

@Injectable()
export class GridService {
	constructor(private zone: NgZone) {}

	model() {
		return new Model();
	}

	service(model) {
		const start = () => {
			Log.info('service', 'invalidate start');

			model.scene(
				{
					status: 'start'
				},
				{
					source: 'grid',
					behavior: 'core'
				}
			);

			return job => {
				const scene = model.scene;
				scene(
					{
						round: scene().round + 1
					},
					{
						source: 'grid',
						behavior: 'core'
					}
				);

				return new Promise(resolve => {
					this.zone.run(() => {
						if (job) {
							job();
						}
					});
					resolve();
				});
			};
		};

		return new GridCoreService(model, start);
	}

	get noop() {
		return noop;
	}

	get identity() {
		return identity;
	}

	get pipe() {
		return Pipe;
	}

	get pipeUnit() {
		return PipeUnit;
	}

	get Command() {
		return Command;
	}

	get Action() {
		return Action;
	}

	get Node() {
		return Node;
	}

	get RowDetailsStatus() {
		return RowDetailsStatus;
	}

	get valueFactory() {
		return valueFactory;
	}

	get labelFactory() {
		return labelFactory;
	}
}
