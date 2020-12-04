import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { WeekTasks } from '../models/week-tasks';


@Injectable({
	providedIn: 'root'
})
export class WeekTasksService {

	constructor(private _http: HttpClient) { }

	private _url = '/api/weekTasks';
	getWeekTasks(): Observable<WeekTasks[]> {
		return this._http.get<WeekTasks[]>(this._url);
	}

	deleteTask(id) {
		return this._http.delete(this._url + "/" + id);
	}
}
