import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from 'src/services/employee.service';
import { EmployeeComponent } from '../employee.component';
import { Employee } from 'src/models/employee';

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.css']
})
export class EmployeeDialogComponent implements OnInit {

  formGroup!: FormGroup;

  constructor(
    private fromBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: EmployeeService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.fillData()
  }

  initForm() {
    this.formGroup = this.fromBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]]
    });
  }

  fillData(){
    if (this.data.Id > 0) {
      this.service.GetEmployee(this.data.Id).subscribe(
        (data: any) => {
      debugger;
          this.formGroup.get('firstName')?.setValue(data.result.firstName);
          this.formGroup.get('lastName')?.setValue(data.result.lastName);
          this.formGroup.get('email')?.setValue(data.result.email);
        });
    }
  }

  Submit() {
    if (this.formGroup.valid) {
      const employee = new Employee();
      employee.Id = this.data.Id;
      employee.FirstName = this.formGroup.get('firstName')?.value;
      employee.LastName = this.formGroup.get('lastName')?.value;
      employee.Email = this.formGroup.get('email')?.value;

      

        if(this.data.Id > 0){
          this.service.UpdateEmployee(employee).subscribe(
            (result: any) => {
              alert("Update Successfully !");
              this.dialogRef.close();
            },
            (error: any) => {
              console.log(error);
            });
        }else{
          this.service.CreateEmployee(employee).subscribe(
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

}
