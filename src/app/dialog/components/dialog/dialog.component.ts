import { Component, ComponentFactoryResolver, OnDestroy, ComponentRef, ViewChild, ViewContainerRef, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'app-dialog',
	templateUrl: './dialog.component.html',
	styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit, OnDestroy {
	@ViewChild('target', { read: ViewContainerRef, static: true }) vcRef: ViewContainerRef;

	componentRef: ComponentRef<any>;

	constructor(
		public dialogRef: MatDialogRef<DialogComponent>,
		private resolver: ComponentFactoryResolver,
		@Inject(MAT_DIALOG_DATA) public data: any) { }

	ngOnInit() {
		const factory = this.resolver.resolveComponentFactory(this.data.component);
		this.componentRef = this.vcRef.createComponent(factory);
		this.componentRef.instance.modalData = this.data.modalData;
		this.componentRef.instance.isValid = this.data.isValid;
		console.log(this.data)
	}

	onNoClick() {
		this.dialogRef.close();
	}

	ngOnDestroy() {
		if (this.componentRef) {
			this.componentRef.destroy();
		}
	}
}
