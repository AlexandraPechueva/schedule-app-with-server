import { ComponentType } from '@angular/cdk/portal';
import { CompileShallowModuleMetadata } from '@angular/compiler';
import { Component, ComponentFactory, ComponentRef, Input, OnChanges, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { concatMap, map, startWith } from 'rxjs/operators';
import { DialogComponent } from 'src/app/dialog/components/dialog/dialog.component';
import { Task } from '../../models/week-tasks';
import { WeekTasksService } from '../../services/week-tasks.service';
import { AddEditComponent } from '../add-edit/add-edit.component';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';

interface ModalData {
	title: string,
	time?: string,
	content?: string,
}

@Component({
	selector: 'app-day-schedule',
	templateUrl: './day-schedule.component.html',
	styleUrls: ['./day-schedule.component.scss']
})
export class DayScheduleComponent implements OnChanges {

	constructor(private _weekTasksService: WeekTasksService,
		private _dialog: MatDialog) { }

	dayTasks$: Observable<Task[]>;
	update$ = new Subject<Task[]>();

	@Input() activatedDay = 0;

	ngOnChanges() {
		console.log(this.activatedDay)
		this._getData();
	}

	private _getData() {
		this.dayTasks$ = this.update$.pipe(
			startWith(''),
			concatMap(() => {
				return this._weekTasksService.getTasks(this.activatedDay)}),
			map(data => data.sort(this._compare))
		)
	}

	addTask() {
		const modalData = {
			title: 'Добавление'
		};
		const dialogRef = this._openDialog(AddEditComponent, '250px', modalData);

		dialogRef.afterClosed().subscribe(confirmResult => {
			if (confirmResult) {
				const newTask = this._makeNewTask(confirmResult.modalData)

				this._addTask(newTask);
			}
		});
	}

	taskClick(task: Task) {
		if (window.getSelection().toString()) return;

		const modalData = {
			title: 'Редактирование',
			time: task.time,
			content: task.content
		}

		const dialogRef = this._openDialog(AddEditComponent, '250px', modalData);

		dialogRef.afterClosed().subscribe(confirmResult => {
			if (confirmResult) {
				const changedTask =  this._makeNewTask(confirmResult.modalData)

				this._changeTask(task.id, changedTask);
			}
		});
	}

	deleteTaskConfirm(taskId: Number) {
		const modalData = {
			title: ''
		};
		const dialogRef = this._openDialog(DeleteConfirmComponent, '250px', modalData);

		dialogRef.afterClosed().subscribe(confirmResult => {
			if (confirmResult) {
				this._deleteTask(taskId);
			}
		});
	}

	private _openDialog(component: Function, width: string, modalData: ModalData ): MatDialogRef<any> {
		return this._dialog.open(DialogComponent, {
			width: width,
			data: {
				component: component,
				modalData: {
					title: modalData.title,
					time: modalData.time,
					content: modalData.content,
				}
			}
		});
	}

	private _deleteTask(taskId) {
		this._weekTasksService.deleteTask(taskId).subscribe(
			_ => this.update$.next(),
			error => {console.log('Произошла ошибка ' + error.status + ': ' + error.statusText)},
		);
	}

	private _addTask(newTask: Task) {
		this._weekTasksService.addTask(newTask).subscribe(
			_ => this.update$.next(),
			error => {console.log('Произошла ошибка ' + error.status + ': ' + error.statusText)},
		);
	}

	private _changeTask(taskId: Number, changedTask: Task) {
		this._weekTasksService.changeTask(taskId, changedTask).subscribe(
			_ => this.update$.next(),
			error => {console.log('Произошла ошибка ' + error.status + ': ' + error.statusText)},
		);
	}

	private _makeNewTask(data: Task): Task{
		return <Task> {
			time: data.time,
			content: data.content,
			dayId: this.activatedDay,
		}
	}

	private _compare(a: Task, b: Task): number {
		if (a.time < b.time) {
			return -1;
		}
		if (a.time > b.time) {
			return 1;
		}
		return 0;
	}
}
