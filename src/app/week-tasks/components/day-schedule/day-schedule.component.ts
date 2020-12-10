import { Component, Input, OnChanges } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { concatMap, map, startWith, tap } from 'rxjs/operators';
import { DialogComponent } from 'src/app/dialog/components/dialog/dialog.component';
import { Task } from '../../models/week-tasks';
import { LoaderService } from '../../services/loader.service';
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
		private _dialog: MatDialog, public loaderService: LoaderService) { }

	dayTasks$: Observable<Task[]>;
	filteredDayTasks$:  Observable<Task[]>;

	defaultState = 'Все';

	filter$ = new BehaviorSubject(this.defaultState);
	update$ = new Subject<Task[]>();

	@Input() activatedDay = 0;

	taskStates: string[] = ['Все','Активные','Прошедшие'];

	ngOnChanges() {
		this._getData();
	}

	private _getData() {
		this.dayTasks$ = this.update$.pipe(
			startWith(''),
			concatMap(() => {
				return this._weekTasksService.getTasks(this.activatedDay)}),
			map(data => data.sort(this._compare)),
			tap(data => this._checkIsTimePassed(data))
		);

		this.filteredDayTasks$ = combineLatest(([this.dayTasks$, this.filter$])).pipe(
			map(([dayTasks, filter]) => {
				if(filter == 'Активные') {return dayTasks.filter(task => !task.isPassed) }
					else if(filter == 'Прошедшие') {return dayTasks.filter(task => task.isPassed)}
					else return dayTasks;
			})
		);
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

	selectState(event) {
		this.filter$.next(event.value);

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
				},
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
			isPassed: this._isPassed(data.time),
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

	private _isPassed(time: string): boolean {
		const today = new Date();
		let currentDay = today.getDay() - 1;
		const currentTime = today.getHours() + ":" + today.getMinutes();

		if (currentDay < 0) {
			currentDay = currentDay + 6;
		}

		if(this.activatedDay < currentDay) {
			return true;
		}
		else {
			return time < currentTime;
		}
	}

	private _checkIsTimePassed(dayTasks: Task[]) {
		dayTasks.forEach(task => {
			task.isPassed = this._isPassed(task.time)
		});
	}
}
