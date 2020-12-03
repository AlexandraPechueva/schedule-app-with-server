import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { WeekTasksService } from '../../services/week-tasks.service';

@Component({
	selector: 'app-week-tasks',
	templateUrl: './week-tasks.component.html',
	styleUrls: ['./week-tasks.component.scss']
})
export class WeekTasksComponent implements OnInit {

	constructor(private _weekTasksService: WeekTasksService) { }

	readonly weekDays$ = this._weekTasksService.getWeekTasks().pipe(
		map(items => {
			return items.map(item => {
				return item.day;
			})
		})

	);

	private _today = new Date().toLocaleDateString('ru-Ru', { weekday: 'short' });

	private dayNumber$ = this.weekDays$.pipe(
		map(days => {
			return days.filter(day => day.name == this._today).map(day => day.id)[0]
		})
	);

	private _currentDayNumber = 0;

	ngOnInit() {
		this.dayNumber$.subscribe(dayNumber => this._setCurrentDay(dayNumber))
	}

	private _setCurrentDay(day: number) {
		this._currentDayNumber = day;
	}

	set activatedDay(val: number) {
		this._currentDayNumber = val;
	}
	
	get activatedDay() {
		return this._currentDayNumber;
	}

	getDay(dayNumber: number) {
		this.activatedDay = dayNumber;
	}
}
