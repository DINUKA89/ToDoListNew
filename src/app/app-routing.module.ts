import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/modules/login/login.component';
import { TasksComponent } from 'src/modules/tasks/tasks.component';

const routes: Routes = [
  { path: 'task', component: TasksComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
