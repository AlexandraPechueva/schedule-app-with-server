import { Component, EventEmitter, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from '../../models/week-tasks';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent{
  @ViewChild('addEditForm') private readonly _form: NgForm;
  submit: EventEmitter<boolean> = new EventEmitter<boolean>();

  get formInvalid() {
    return this._form.invalid;
  }

  modalData: Task = {
    time: '',
    content: '',
  }

  onInput(){
    this.submit.emit(!this.formInvalid);
  }
}
