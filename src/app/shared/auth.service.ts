import { Injectable } from '@angular/core';
import{AngularFireAuth} from '@angular/fire/compat/auth';
import{GoogleAuthProvider} from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth: AngularFireAuth, private router: Router) { }

  //login method
  login(email: string, password: string){
    this.fireAuth.signInWithEmailAndPassword(email,password).then( res => {      
      // const id = res.user?.uid;
      if(res.user){
        localStorage.setItem('token', JSON.stringify(res.user?.uid));
        localStorage.setItem('token1', 'true');
        localStorage.setItem('token-name', JSON.stringify(res.user?.email));
        // alert(localStorage.getItem('token'));
        this.router.navigate(['/dashboard']);
      }else{
        localStorage.setItem('token', '');
        alert('Wrong Username/Password');
        this.router.navigate(['/login']);
      }
      

      // if(res.user?.emailVerified == true){
      //   this.router.navigate(['/dashboard']);
      // } else{
      //   this.router.navigate(['/verify-email']);
      // }
    }, err => {
      alert(err.massage);
      this.router.navigate(['/login']);
    }
    )
  }

  //register method
  register(email : string, password : string){    
    this.fireAuth.createUserWithEmailAndPassword(email,password).then(res => { 
      alert('Registration Successful!');    
      this.router.navigate(['/login']);
      // this.sendEmailForVerification(res.user);
    }, err => {
      alert(err.massage);
      this.router.navigate(['/registration']);
    })
  }

  //Signout method
  logout(){
    this.fireAuth.signOut().then(() => {
      localStorage.clear();
      // localStorage.removeItem('token1');
      this.router.navigate(['/login']);
    }, err => {
      alert(err.massage);
    })
  }

  //Forgot the password
  forgotPassword(email : string){
    this.fireAuth.sendPasswordResetEmail(email).then(() => {
      this.router.navigate(['/verify-email']);
    }, err => {
      alert(err.massage);
    })
  }

  //Send Verification Mail
  sendEmailForVerification(user : any){
    user.sendEmailForVerification.then((res : any) => {
      this.router.navigate(['/verify-email']);
    }, (err : any) => {
      alert(err.massage);
    });
  }

  //Sign In With Google
  googleSignIn(){
    return this.fireAuth.signInWithPopup(new GoogleAuthProvider).then(res =>{
      localStorage.setItem('token', JSON.stringify(res.user?.uid));
      localStorage.setItem('token-name', JSON.stringify(res.user?.email));
      localStorage.setItem('token1', 'true');
        // alert(localStorage.getItem('token-name'));
      this.router.navigate(['/dashboard']);   
        
    }, err => {
      alert(err.massage);
    })
  }

  token(){
    return localStorage.getItem('token-name')
  }

  loggedIn(){
    return localStorage.getItem('token1');
  }
}
