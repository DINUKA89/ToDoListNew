import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Todolist } from 'src/app/model/todolist';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-create-todolist',
  templateUrl: './create-todolist.component.html',
  styleUrls: ['./create-todolist.component.css']
})
export class CreateTodolistComponent implements OnInit {

  formGroup!:FormGroup

  todolistList : Todolist[] = []

  todolist : Todolist = {
    id: '',
    name: '',
    description: '',
    assignDate: new Date(),
    completionDate: new Date(),
    comments:'',
    progress: '',
    userId: ''
  }

  constructor(
    private fromBuilder:FormBuilder, 
    private data:DataService,
    public dialogRef: MatDialogRef<CreateTodolistComponent>,
    @Inject(MAT_DIALOG_DATA) public dt: any
    ) { }

  ngOnInit(): void {
    this.initForm(); 
    this.fillData();
  }

  initForm() {
    this.formGroup = this.fromBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      assignDate: ['', [Validators.required]],
      completionDate: ['', [Validators.required]],
      comments: ['', [Validators.required]],
      progress: ['In-Progress', [Validators.required]],
      userId: [localStorage.getItem('token'),[]]
    });
  }

  fillData() {
    if (this.dt.Id != '0') {
          this.formGroup.get('name')?.setValue(this.dt.Name);
          this.formGroup.get('description')?.setValue(this.dt.Description);
          this.formGroup.get('assignDate')?.setValue(this.dt.AssignDate);
          this.formGroup.get('completionDate')?.setValue(this.dt.CompletionDate);
          this.formGroup.get('comments')?.setValue(this.dt.Comments);
          this.formGroup.get('progress')?.setValue(this.dt.Progress);
    }

  }

  Submit(){
    if(this.formGroup.valid){
      this.todolist.id = this.dt.Id;
      this.todolist.name = this.formGroup.get('name')?.value;
      this.todolist.description = this.formGroup.get('description')?.value;
      this.todolist.assignDate = this.formGroup.get('assignDate')?.value;
      this.todolist.completionDate = this.formGroup.get('completionDate')?.value;
      this.todolist.comments = this.formGroup.get('comments')?.value;
      this.todolist.progress = this.formGroup.get('progress')?.value;
      this.todolist.userId = this.formGroup.get('userId')?.value;
    
      if(this.dt.Id != '0'){
        this.data.updateTodolist(this.todolist);
            alert("Update Successfully !");
            this.dialogRef.close();
      }else{
        this.data.addTodolist(this.todolist).then(
          () => {
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
