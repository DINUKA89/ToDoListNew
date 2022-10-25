import { identifierName } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from 'src/models/employee';
import { Tasks } from 'src/models/task';
import { EmployeeService } from 'src/services/employee.service';
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

  constructor(
    private fromBuilder: FormBuilder,
    public dialogRef: MatDialogRef<TasksComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: TaskService,
    private employeeService: EmployeeService
  ) {

  }

  ngOnInit(): void {

    this.initForm();
    this.fillEmployee();
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
      this.service.GetTask(this.data.Id).subscribe(
        (data: any) => {
      debugger;
          this.formGroup.get('name')?.setValue(data.result.name);
          this.formGroup.get('description')?.setValue(data.result.description);
          if(data.result.empId > 0){
            this.formGroup.get('employee')?.setValue(data.result.firstName);
          };
          this.formGroup.get('assignDate')?.setValue(data.result.assignDate);
          this.formGroup.get('completionDate')?.setValue(data.result.completionDate);

          
          
          // this.formGroup.patchValue({
          //   name: data.result.Name,
          //   description: data.result.Description,
          //   assignDate: data.result.AssignDate,
          //   completionDate: data.result.CompletionDate
          // });

        });
    }

  }

  fillEmployee() {
    this.employeeService.GetAllEmployee().subscribe(
      (data: any) => {
        this.employeeList = data.result;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  Submit() {
    debugger;
    if (this.formGroup.valid) {

      const task = new Tasks();
      task.Id = this.data.Id;
      task.Name = this.formGroup.get('name')?.value;
      task.Description = this.formGroup.get('description')?.value;
      task.employee = this.formGroup.get('employee')?.value;
      task.AssignDate = this.formGroup.get('assignDate')?.value;
      task.CompletionDate = this.formGroup.get('completionDate')?.value;
      
      if(this.data.Id > 0){
        this.service.UpdateTask(task).subscribe(
          (result: any) => {
            alert("Update Successfully !");
            this.dialogRef.close();
          },
          (error: any) => {
            console.log(error);
          });
      }else{
        this.service.CreateTask(task).subscribe(
          (result: any) => {
            alert("Saved Successfully !");
            this.dialogRef.close();
          },
          (error: any) => {
            console.log(error);
          });
      }
      
    }
  }

  displayFrom(value : any){
    return value? value.firstName: '';
  }

  // taskEmployee : Employee[] = [];
  // fillEmpData(){
  //   this.service.GetAllEmployee().subscribe(
  //     (data: any) => { 
  //       this.dataSource = data.result;
  //     });
  // }

}
