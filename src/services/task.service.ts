import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tasks } from 'src/models/task';

const API_URL = `${environment.apiURL}/Task`;
 
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  // private headerJson = new HttpHeaders({
  //   'Content-Type':'application/json'
  // });

  GetAllTask(): Observable<any> {
    return this.http.get(API_URL);
  }

  GetTask(id:number): Observable<any> {
    return this.http.get(API_URL+'/'+id);
  }

  CreateTask(obj:Tasks): Observable<{}> { 
    // let body = JSON.stringify(obj);
    return this.http.post<any>(API_URL,obj);
  }

  UpdateTask(obj:Tasks): Observable<{}> {
    // let body = JSON.stringify(obj);
    return this.http.put(API_URL,obj);
  }

  DeleteTask(id:number): Observable<any> {
    // let body = JSON.stringify(obj);
    return this.http.delete(API_URL+'/'+id);
  }
 
}
