import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';
import { __asyncDelegator } from 'tslib';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formGroup!: FormGroup
  hide = true;

  constructor(private formBuilder: FormBuilder,private auth: AuthService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.formGroup = this.formBuilder.group({
      email: ['',[Validators.required]],
      password: ['',[Validators.required]]
    });
  }

  register(){
    // if(this.formGroup.get('email')?.value == ''){
    //   alert('Please Enter Email');
    //   return;
    // }

    // if(this.formGroup.get('password')?.value == ''){
    //   alert('Please Enter Password');
    //   return;
    // }

    if(this.formGroup.valid){
      this.auth.register(this.formGroup.get('email')?.value,this.formGroup.get('password')?.value)
    }    

    this.formGroup.get("email")?.setValue('');
    this.formGroup.get("password")?.setValue('');
  }

}
