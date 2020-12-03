import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, filter, map, tap } from 'rxjs/operators';
import { Task } from '../../models/week-tasks';
import { WeekTasksService } from '../../services/week-tasks.service';


@Component({
	selector: 'app-day-schedule',
	templateUrl: './day-schedule.component.html',
	styleUrls: ['./day-schedule.component.scss']
})
export class DayScheduleComponent implements OnChanges {

	constructor(private _weekTasksService: WeekTasksService) { }

	dayTasks$!: Observable<Task[]>;
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
}
