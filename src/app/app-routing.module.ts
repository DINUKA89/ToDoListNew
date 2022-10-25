import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from 'src/modules/employee/employee.component';
import { TasksComponent } from 'src/modules/tasks/tasks.component';

const routes: Routes = [
  { path: 'task', component: TasksComponent },
  { path: 'employee', component: EmployeeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
