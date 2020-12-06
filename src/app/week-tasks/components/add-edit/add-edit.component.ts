import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {

  constructor() { }
	modalData = {
		time: '',
		task: ''
	}

  ngOnInit() {
	console.log(this.modalData)
  }



}
