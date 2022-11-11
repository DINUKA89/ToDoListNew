import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { doc } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs';
import { Todolist } from 'src/app/model/todolist';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';
import { CreateTodolistComponent } from '../create-todolist/create-todolist.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['Name', 'Description', 'AssignDate', 'CompletionDate','Progress','Comments','Actions'];
  dataSource!: Todolist[];

  todolist : Todolist = {
    id: '',
    name: '',
    description: '',
    assignDate: new Date(),
    completionDate: new Date(),
    comments:'',
    progress: '',
    userId: JSON.parse(localStorage.getItem('token') || '{}')
  }


  constructor(private auth:AuthService,public dialog: MatDialog, private data : DataService) { 
  }

  ngOnInit(): void {
    this.getAllToDoList();
  }

  openDialog(){
    const dialogRef = this.dialog.open(CreateTodolistComponent, {
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

      this.getAllToDoList();
    });
  }

  getAllToDoList(){
    

    // this.data.getByIdTodolist('aDs0AkkJxhsXdNSlDDCk').subscribe( (res: any) => {
      this.data.gettAllTodolist().subscribe( (res: any) => {
      this.dataSource = 
      // res.filter((r:any) => {return r.userId == this.todolist.userId})
      res.map((e:any) => {
        const d = e.payload.doc.data();
        d.id = e.payload.doc.id;
        return d;
      })
    }, err => {
      alert(err.massage);
    }
      // (res: any) => { 
      //   this.dataSource = res.result;
      // }, err => {
      //   alert(err.massage);
      // }

      );
  }

  openDialog_Edit(id:string,name:string,description:string,assignDate:Date,completionDate:Date,progress:string,comments:string){
    const dialogRef = this.dialog.open(CreateTodolistComponent, {
      width: '450px',
      data: {
        title: 'Update Task',
        subTitle: 'Update the task details',
        submit: 'Update',
        Id: id,
        Name: name,
        Description: description,
        AssignDate : assignDate,
        CompletionDate: completionDate,
        Progress: progress,
        Comments: comments
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      this.getAllToDoList();
    });
  }

  deleteTask(todolist : Todolist){
    if(window.confirm('Are you sure you want to delete a task :'+ todolist.name+' ?')){
      this.data.deleteTodolist(todolist);
    }    
  }

}
