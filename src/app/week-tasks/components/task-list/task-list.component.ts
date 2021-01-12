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
  dayTasks: Task[];

  ngOnInit() {
    this._route.data.subscribe(data => this.dayTasks = data['taskList']);
  }
}
