import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { delay, filter, map, tap } from 'rxjs/operators';
import { DialogComponent } from 'src/app/dialog/components/dialog/dialog.component';
import { Task } from '../../models/week-tasks';
import { WeekTasksService } from '../../services/week-tasks.service';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';


@Component({
	selector: 'app-day-schedule',
	templateUrl: './day-schedule.component.html',
	styleUrls: ['./day-schedule.component.scss']
})
export class DayScheduleComponent implements OnChanges {

	constructor(private _weekTasksService: WeekTasksService, private _dialog: MatDialog) { }

	dayTasks$: Observable<Task[]>;
	@Input() activatedDay = 0;

	ngOnChanges() {
		console.log(this.activatedDay)
		this._getData();
	}

	private _getData() {
		return this.dayTasks$ = this._weekTasksService.getWeekTasks().pipe(
			delay(2000),
			map(items => items.filter(
				item => item.day.id == this.activatedDay).map(item => item.tasks)[0]
		));
	}

	deleteTask(taskId: Number) {
		console.log(taskId)
		const  dialogRef = this._dialog.open(DialogComponent, {
				width: '250px',
				data: { component: DeleteConfirmComponent
			}
		});

		dialogRef.afterClosed().subscribe(confirmresult => {
			console.log(confirmresult);
			if (confirmresult) { 
				this._weekTasksService.deleteTask(taskId);
				console.log("Delete confirm is approved by user.");
			}

			else {
				console.log("Delete confirm is cancelled by user.");
			}
		});
	}
}
