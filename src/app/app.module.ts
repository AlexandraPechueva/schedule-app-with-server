import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DayScheduleComponent } from '../app/week-tasks/components/day-schedule/day-schedule.component';
import { WeekTasksComponent } from '../app/week-tasks/components/week-tasks/week-tasks.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteConfirmComponent } from './week-tasks/components/delete-confirm/delete-confirm.component';
import { DialogComponent } from './dialog/components/dialog/dialog.component';

@NgModule({
	declarations: [
		AppComponent,
		WeekTasksComponent,
		DayScheduleComponent,
		DeleteConfirmComponent,
		DialogComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		BrowserAnimationsModule,
		MatDialogModule,
	],

	exports: [
		MatDialogModule,
	],

	// entryComponents: [
	// 	DialogComponent
	// ],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
