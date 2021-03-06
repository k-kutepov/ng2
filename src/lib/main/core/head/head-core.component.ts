import { Component, OnInit, ElementRef, NgZone, ChangeDetectorRef } from '@angular/core';
import { ViewCoreService } from '../view/view-core.service';
import { ColumnView } from 'ng2-qgrid/core/scene/view/column.view';
import { EventListener } from 'ng2-qgrid/core/infrastructure/event.listener';
import { EventManager } from 'ng2-qgrid/core/infrastructure/event.manager';
import { HeadCtrl } from 'ng2-qgrid/core/head/head.ctrl';
import { TableCoreService } from '../table/table-core.service';
import { RootService } from '../../../infrastructure/component/root.service';
import { NgComponent } from '../../../infrastructure/component/ng.component';

@Component({
	// tslint:disable-next-line
	selector: 'thead[q-grid-core-head]',
	templateUrl: './head-core.component.html'
})
export class HeadCoreComponent extends NgComponent implements OnInit {
	constructor(
		public $view: ViewCoreService,
		public $table: TableCoreService,
		private root: RootService,
		private elementRef: ElementRef,
		private zone: NgZone,
		private cd: ChangeDetectorRef
	) {
		super();
	}

	ngOnInit() {
		const { model } = this.root;

		const element = this.elementRef.nativeElement;
		const ctrl = new HeadCtrl(model, this.$view, this.root.bag);
		const listener = new EventListener(element, new EventManager(this));

		this.zone.runOutsideAngular(() => {
			this.using(listener.on('mousemove', e => ctrl.onMouseMove(e)));
			this.using(listener.on('mouseleave', e => ctrl.onMouseLeave(e)));
		});
	}

	columnId(index: number, item: ColumnView) {
		return item.model.key;
	}

	rowId(index: number) {
		return index;
	}
}
