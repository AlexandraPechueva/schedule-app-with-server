import { LEADING_TRIVIA_CHARS } from '@angular/compiler/src/render3/view/template';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { Task } from '../../models/week-tasks';

interface Data extends Task {
	isValid: boolean;
}

@Component({
	selector: 'app-add-edit',
	templateUrl: './add-edit.component.html',
	styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent{
	@ViewChild('addEditForm') private readonly _form: NgForm;
	@ViewChild("taskInput") private readonly _task: ElementRef;
	@ViewChild("timeInput") private readonly _time: ElementRef;

	modalData: Task = {
		time: '',
		content: '',
	}

	isValid = false;

	onBlurMethod(){
		console.log(this._task)
		if(this._form.status !== 'INVALID')
		{
			this.isValid = true;
		}
	}
}
