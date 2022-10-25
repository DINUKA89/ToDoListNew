import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Tasks } from 'src/models/task';
import { TaskService } from 'src/services/task.service';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  displayedColumns: string[] = ['Name', 'Description', 'AssignDate', 'CompletionDate','FirstName','Actions'];
  dataSource!: Tasks[];

  constructor(
    public dialog: MatDialog,
    private service: TaskService
  ) { }

  ngOnInit(): void {
    this.fillData();
  }

  fillData() {
    this.service.GetAllTask().subscribe(
      (data: any) => { 
        debugger;
        this.dataSource = data.result;
      });
  }

  deleteTask(id:number){
    this.service.DeleteTask(id).subscribe(
      (result: any) => {
        alert("Delete Successfully !");
      },
      (error: any) => {
        console.log(error);
      });
      location.reload();
      this.fillData();
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '450px',
      data: {
        title: 'Create Task',
        subTitle: 'Fill the task details',
        submit: 'Submit',
        Id: 0
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;

      this.fillData();
    });
  }

  openDialog_Edit(id:number): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '450px',
      data: {
        title: 'Update Task',
        subTitle: 'Update the task details',
        submit: 'Update',
        Id: id
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;

      this.fillData();
    });
  }

}
