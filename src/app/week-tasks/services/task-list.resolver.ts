import { Injectable } from '@angular/core';
import {
	Router, Resolve,
	RouterStateSnapshot,
	ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Task } from '../models/week-tasks';
import { WeekTasksService } from './week-tasks.service';

@Injectable({
  providedIn: 'root'
})
export class TaskListResolver implements Resolve<Task[]> {
	constructor(private _weekTasksService: WeekTasksService) {}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Task[]> {
		return this._weekTasksService.getTasks(route.params['dayNumber']);
	}

}
