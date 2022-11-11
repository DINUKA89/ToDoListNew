import { Injectable } from '@angular/core';
import{AngularFirestore} from '@angular/fire/compat/firestore';
import { Todolist } from '../model/todolist';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs : AngularFirestore) { }

  //Add ToDoList
  addTodolist(todolist : Todolist){
    todolist.id = this.afs.createId();
    return this.afs.collection('/ToDoList').add(todolist);
  }

  //Get All ToDoList
  gettAllTodolist(){
    return this.afs.collection('/ToDoList').snapshotChanges();
  }

  //Get ToDoList By Id
  getByIdTodolist(id : string){
    debugger;
    return this.afs.collection('/ToDoList/').doc(id).get();
  }

  //Delete ToDoList
  deleteTodolist(todolist : Todolist){
    return this.afs.doc('/ToDoList/'+todolist.id).delete();
  }

  //Update ToDoList
  updateTodolist(todolist : Todolist){
    this.deleteTodolist(todolist);
    this.addTodolist(todolist);
  }
}
