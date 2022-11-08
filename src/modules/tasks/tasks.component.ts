import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs';
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

  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  message = '';

  constructor(
    public dialog: MatDialog,
    private service: TaskService
  ) { }

  ngOnInit(): void {
    this.fillData();
  }

  fillData() {

    this.service.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe((data: any) => { 
      debugger;
      this.dataSource = data.result;
    });
    
  }

  deleteTask(id:string){
    this.service.delete(id)
    .then(() => {
      this.refreshList.emit();
      this.message = 'The tutorial was updated successfully!';
    })
    .catch(err => console.log(err));
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

      this.fillData();
    });
  }

}
