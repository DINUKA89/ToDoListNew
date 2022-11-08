import { Component, OnInit } from '@angular/core';

import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Employee } from 'src/models/employee';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService : SocialAuthService,
    private employee : Employee,
    private router : Router
  ) { }

  user!: SocialUser;

  ngOnInit(): void {
    this.authService.authState.subscribe((user) =>{
      debugger; 
      this.user = user;
      // user.authorizationCode
    })
  }

  LogInWithGoogle(): any{
    debugger; 
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  LogOut(): any{
    this.authService.signOut();
  }

}
