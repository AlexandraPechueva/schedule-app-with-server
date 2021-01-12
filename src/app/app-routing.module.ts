import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskListComponent } from './week-tasks/components/task-list/task-list.component';
import { WeekTasksComponent } from './week-tasks/components/week-tasks/week-tasks.component';
import { TaskListResolver } from './week-tasks/services/task-list.resolver';

const routes: Routes = [
  { path: '', component: WeekTasksComponent },
  { path: ':dayNumber', component: TaskListComponent, resolve: {taskList: TaskListResolver}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
