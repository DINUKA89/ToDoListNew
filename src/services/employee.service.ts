import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from 'src/models/employee';

const API_URL = `${environment.apiURL}/Employee`;
 
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  // private headerJson = new HttpHeaders({
  //   'Content-Type':'application/json'
  // });

  GetAllEmployee(): Observable<any> {
    return this.http.get(API_URL);
  }

  GetEmployee(id:number): Observable<any> {
    return this.http.get(API_URL+'/'+id);
  }

  CreateEmployee(obj:Employee): Observable<{}> { 
    // let body = JSON.stringify(obj);
    return this.http.post<any>(API_URL,obj);
  }

  UpdateEmployee(obj:Employee): Observable<{}> {
    // let body = JSON.stringify(obj);
    return this.http.put(API_URL,obj);
  }

  DeleteEmployee(id:number): Observable<any> {
    // let body = JSON.stringify(obj);
    return this.http.delete(API_URL+'/'+id);
  }
 
}
