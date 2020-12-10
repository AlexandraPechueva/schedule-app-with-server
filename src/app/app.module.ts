import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DayScheduleComponent } from '../app/week-tasks/components/day-schedule/day-schedule.component';
import { WeekTasksComponent } from '../app/week-tasks/components/week-tasks/week-tasks.component';
import { HttpClientModule,  HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteConfirmComponent } from './week-tasks/components/delete-confirm/delete-confirm.component';
import { DialogComponent } from './dialog/components/dialog/dialog.component';
import { AddEditComponent } from './week-tasks/components/add-edit/add-edit.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TaskListComponent } from './week-tasks/components/task-list/task-list.component';
import { PreloaderComponent } from './week-tasks/components/preloader/preloader.component';
import { LoaderInterceptor } from './week-tasks/services/loader.interceptor';
import { LoaderService } from './week-tasks/services/loader.service';

@NgModule({
	declarations: [
		AppComponent,
		WeekTasksComponent,
		DayScheduleComponent,
		DeleteConfirmComponent,
		DialogComponent,
		AddEditComponent,
		TaskListComponent,
		PreloaderComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		BrowserAnimationsModule,
		MatFormFieldModule,
		MatDialogModule,
		MatInputModule,
		MatButtonModule,
		MatSelectModule,
		FormsModule,
	],

	exports: [
		MatFormFieldModule,
		MatDialogModule,
		MatInputModule,
	],

	entryComponents: [
		LoaderInterceptor,
	],
	providers: [{
		provide: HTTP_INTERCEPTORS,
		useClass: LoaderInterceptor,
		multi: true
	  },
	LoaderService],
	bootstrap: [AppComponent]
})
export class AppModule { }
