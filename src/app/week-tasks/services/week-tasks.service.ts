import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Day, Task } from '../models/week-tasks';



@Injectable({
	providedIn: 'root'
})
export class WeekTasksService {

	constructor(private _http: HttpClient) { }

	private _daysUrl ='/api/days';
	private _tasksUrl ='/api/tasks';

	getDays(): Observable<Day[]> {
		return this._http.get<Day[]>(this._daysUrl);
	}

	getTasks(dayId: Number): Observable<Task[]> {
		return this._http.get<Task[]>(this._tasksUrl + '?dayId=' + dayId).pipe(
			delay(2000)
		)
	}

	deleteTask(taskId: Number): Observable<object> {
		return this._http.delete(this._tasksUrl + '/' + taskId);
	}

	addTask(newTask: Task): Observable<object> {
		return this._http.post(this._tasksUrl, newTask);
	}

	changeTask(taskId: Number, changedTask): Observable<object> {
		return this._http.put(this._tasksUrl + '/' + taskId, changedTask);
	}
}