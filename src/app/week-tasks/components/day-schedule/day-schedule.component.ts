import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { concatMap, startWith } from 'rxjs/operators';
import { DialogComponent } from 'src/app/dialog/components/dialog/dialog.component';
import { Task } from '../../models/week-tasks';
import { WeekTasksService } from '../../services/week-tasks.service';
import { AddEditComponent } from '../add-edit/add-edit.component';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';


@Component({
	selector: 'app-day-schedule',
	templateUrl: './day-schedule.component.html',
	styleUrls: ['./day-schedule.component.scss']
})
export class DayScheduleComponent implements OnChanges {

	constructor(private _weekTasksService: WeekTasksService,
		private _dialog: MatDialog) { }

	dayTasks$: Observable<Task[]>;
	update$ = new Subject<Task[]>();

	@Input() activatedDay = 0;

	ngOnChanges() {
		console.log(this.activatedDay)
		this._getData();
	}

	private _getData() {
		this.dayTasks$ = this.update$.pipe(
			startWith(''),
			concatMap(() => {
				return this._weekTasksService.getTasks(this.activatedDay)}),
		)
	}

	addTask() {
		console.log('confirmresult');
		const  dialogRef = this._dialog.open(DialogComponent, {
			width: '450px',
			data: { component: AddEditComponent,
	}
	});

	dialogRef.afterClosed().subscribe(confirmresult => {
		console.log(confirmresult);
	});
	}

	deleteTaskConfirm(taskId: Number) {
		console.log(taskId)
		const  dialogRef = this._dialog.open(DialogComponent, {
				width: '250px',
				data: { component: DeleteConfirmComponent,

			}
		});

		dialogRef.afterClosed().subscribe(confirmresult => {
			console.log(confirmresult);
			if (confirmresult) { 
				this._deleteTask(taskId);
			}
		});
	}

	private _deleteTask(taskId) {
		this._weekTasksService.deleteTask(taskId).subscribe(
			_ => this.update$.next(),
			error => {console.log('Произошла ошибка ' + error.status + ': ' + error.statusText)},
		);
	}

	// private _addTask(newTask) {
	// 	console.log(newTask)
	// }
}
