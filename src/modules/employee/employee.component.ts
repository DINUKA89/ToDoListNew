import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Employee } from 'src/models/employee';
import { EmployeeService } from 'src/services/employee.service';
import { EmployeeDialogComponent } from './employee-dialog/employee-dialog.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  displayedColumns: string[] = ['FirstName', 'LastName', 'Email','Actions'];
  dataSource!: Employee[];

  constructor(
    public dialog: MatDialog,
    private service: EmployeeService
    ) { }

  ngOnInit(): void {
    this.fillData();
  }

  fillData() {
    this.service.GetAllEmployee().subscribe(
      (data: any) => { 
        debugger
        this.dataSource = data.result;
      });
  }

  deleteEmployee(id:number){
    this.service.DeleteEmployee(id).subscribe(
      (result: any) => {
        debugger;
        alert("Delete Successfully !");
      },
      (error: any) => {
        console.log(error);
      });
      location.reload();
      this.fillData();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EmployeeDialogComponent, {
      width: '450px',
      data: {
        title: 'Create Employer',
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
    const dialogRef = this.dialog.open(EmployeeDialogComponent, {
      width: '450px',
      data: {
        title: 'Update Employer',
        subTitle: 'Update the Employee details',
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
