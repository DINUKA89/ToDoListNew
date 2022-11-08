import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tasks } from 'src/models/task';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Employee } from 'src/models/employee';
 
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private dbPath = '/AssignTasks';
  // private dbPath : string = environment.firebase.databaseURL;

  tasksRef: AngularFireList<Tasks>;

  constructor(public db: AngularFireDatabase) {
    this.tasksRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Tasks> {
    return this.tasksRef;
  }

  getAllById(key: string): AngularFireList<Tasks> {
    return this.tasksRef;
  }

  create(task: Tasks): any {
    return this.tasksRef.push(task);
  }

  update(key: string, value: any): Promise<void> {
    return this.tasksRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.tasksRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.tasksRef.remove();
  }



  // constructor(private http: HttpClient) { }

  // private headerJson = new HttpHeaders({
  //   'Content-Type':'application/json'
  // });

  // GetAllTask(): Observable<any> {
  //   return this.http.get(API_URL);
  // }

  // GetTask(id:number): Observable<any> {
  //   return this.http.get(API_URL+'/'+id);
  // }

  // CreateTask(obj:Tasks): Observable<{}> { 
  //   // let body = JSON.stringify(obj);
  //   // return this.http.post<any>(API_URL,obj);
  //   return this.http.post<any>(API_URL,obj);
  // }

  // UpdateTask(obj:Tasks): Observable<{}> {
  //   // let body = JSON.stringify(obj);
  //   return this.http.put(API_URL,obj);
  // }

  // DeleteTask(id:number): Observable<any> {
  //   // let body = JSON.stringify(obj);
  //   return this.http.delete(API_URL+'/'+id);
  // }
 
}
