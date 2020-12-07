import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../../models/week-tasks';

@Component({
	selector: 'app-task-list',
	templateUrl: './task-list.component.html',
	styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

	constructor(private _route: ActivatedRoute,) { }
	readonly params$ = this._route.params;
	dayTasks: Task[];
	
	ngOnInit() {
		this.params$.subscribe(_ => console.log(_));
		this._route.data.subscribe(data => {
			console.log(data)
			this.dayTasks = data['taskList']
		}
	);
	}

}
