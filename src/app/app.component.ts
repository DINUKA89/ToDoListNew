import { Component } from '@angular/core';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-firebase-crud';
  // name = localStorage.getItem('token-name'); 

  constructor(public auth:AuthService){
    
  }
}




