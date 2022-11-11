import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formGroup!: FormGroup;

  hide = true;
  
  constructor(private fromBuilder: FormBuilder,private auth: AuthService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = this.fromBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  login(){
    if (this.formGroup.valid){
      this.auth.login(this.formGroup.get("email")?.value,this.formGroup.get("password")?.value);
    }

    this.formGroup.get("email")?.setValue('');
    this.formGroup.get("password")?.setValue('');
  }

  signInWithGoogle(){
    this.auth.googleSignIn();
  }

}
