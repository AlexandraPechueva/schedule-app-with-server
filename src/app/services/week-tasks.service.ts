import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { WeekTasks } from '../models/week-tasks';

@Injectable({
	providedIn: 'root'
})
export class WeekTasksService {

	constructor(private _http: HttpClient) { }

	getWeekTasks(): Observable<WeekTasks[]> {
		return this._http.get<WeekTasks[]>('/api/weekTasks');
	}
}
