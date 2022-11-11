import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  formGroup!: FormGroup

  constructor(private formBuilder:FormBuilder,private auth:AuthService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.formGroup = this.formBuilder.group({
      email : ['',[Validators.required]]
    })
  }

  forgotPassword(){
    if(this.formGroup.get('email')?.value == ''){
      alert('Please enter Email');
      return;
    }

    if(this.formGroup.valid){
      this.auth.forgotPassword(this.formGroup.get('email')?.value);
    }
    
    this.formGroup.get('email')?.setValue('');
  }

}
