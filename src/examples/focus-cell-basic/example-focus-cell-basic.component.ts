import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '../data.service';
import { GridModel, Grid } from 'ng2-qgrid';

@Component({
	selector: 'example-focus-cell-basic',
	templateUrl: 'example-focus-cell-basic.component.html',
	styleUrls: ['example-focus-cell-basic.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleFocusCellBasicComponent {
	gridModel: GridModel;

	constructor(dataService: DataService, qgrid: Grid) {
		this.gridModel = qgrid.model();

		dataService
			.getAtoms()
			.subscribe(rows => {
				this.gridModel.data({ rows });

				const gridService = qgrid.service(this.gridModel);

				// navigate to the 2nd page to the bottom
				gridService.focus(99, 2);
			});
	}
}
