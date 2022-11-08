import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map } from 'rxjs';
import { Tasks } from 'src/models/task';
import { TaskService } from 'src/services/task.service';
import { TasksComponent } from '../tasks.component';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css']
})
export class TaskDialogComponent implements OnInit {

  formGroup!: FormGroup;

  employeeList: any[] = [];

  currentTasks: Tasks = {
    Id: '',
    Name: '',
    Description: '',
    AssignDate: '',
    CompletionDate: ''
  };
  message = '';

  constructor(
    private fromBuilder: FormBuilder,
    public dialogRef: MatDialogRef<TasksComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: TaskService
  ) {

  }

  ngOnInit(): void {

    this.initForm();
    this.fillData();            
  }

  initForm() {
    this.formGroup = this.fromBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      employee: ['', [Validators.required]],
      assignDate: ['', [Validators.required]],
      completionDate: ['', [Validators.required]]
    });
  }

  fillData() {
    if (this.data.Id > 0) {
      this.service.getAllById(this.data.Id).snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ key: c.payload.key, ...c.payload.val() })
          )
        )
      )
      .subscribe(
        (data: any) => {
      debugger;
          this.formGroup.get('name')?.setValue(data.result.name);
          this.formGroup.get('description')?.setValue(data.result.description);
            this.formGroup.get('employee')?.setValue(data.result.employee);
          this.formGroup.get('assignDate')?.setValue(data.result.assignDate);
          this.formGroup.get('completionDate')?.setValue(data.result.completionDate);
        });
    }

  }

  Submit() : void{
    debugger;
    if (this.formGroup.valid) {

      const task = new Tasks();
      task.Id = this.data.Id;
      task.Name = this.formGroup.get('name')?.value;
      task.Description = this.formGroup.get('description')?.value;
      task.AssignDate = this.formGroup.get('assignDate')?.value;
      task.CompletionDate = this.formGroup.get('completionDate')?.value;

      
      
      if(task.Id != null){
        this.service.update(task.Id,task)
          .then(() => {
            this.message = 'The status was updated successfully!';
          })
          .catch(err => console.log(err));
      }else{
        this.service.create(task).then(() => {
          console.log('Created new Task successfully!');
        });
      }
      
    }
  }

  displayFrom(value : any){
    return value? value.firstName: '';
  }

}
