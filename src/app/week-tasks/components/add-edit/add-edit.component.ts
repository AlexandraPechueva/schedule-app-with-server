import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Task } from '../../models/week-tasks';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {

  constructor() { }
	modalData: Task = {
		time: '',
		content: '',
	}

	ngOnInit() {
		console.log(this.modalData)
	}



}
