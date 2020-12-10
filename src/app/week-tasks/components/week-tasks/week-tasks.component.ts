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

	readonly weekDays$ = this._weekTasksService.getDays();
	readonly dayNumber$ = this.weekDays$.pipe(
		map(days => days.filter(day => day.shortName == this._today)[0].id)
	);

	private _today = new Date().toLocaleDateString('ru-Ru', { weekday: 'short' });
	private _currentDayNumber = 0;

	ngOnInit() {
		this.dayNumber$.subscribe(dayNumber => this._setCurrentDay(dayNumber));
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
