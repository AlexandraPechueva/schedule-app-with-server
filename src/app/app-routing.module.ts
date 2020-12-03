import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeekTasksComponent } from './week-tasks/components/week-tasks/week-tasks.component';

const routes: Routes = [
	{ path: '', component: WeekTasksComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
