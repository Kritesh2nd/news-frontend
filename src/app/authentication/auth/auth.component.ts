import { UsersService } from './../../services/users.service';
import { NgIf } from '@angular/common';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { MaterialModule } from '../../utils/material/material.module';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UserAuth, UserLogin, UserSignUp, TokenResponse } from '../../../types';
import { FormBuilder, FormsModule, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { catchError, Observable, of } from 'rxjs';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    NgIf, MaterialModule, FormsModule, ReactiveFormsModule,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit {

  authSignIn: boolean = true;
  showPassword: boolean = false;
  
  formValidate: boolean = false;

  @Output() manageAuthPage = new EventEmitter();
  manageAuthPageClose(){
    this.manageAuthPage.emit( );
  }

  authForm = this.formBuilder.group({
    firstName:'Kritesh',
    lastName:'Thapa',
    email:'kritesh@gmail.com',
    password:'password',
  })

  ngOnInit(): void {
    
  }

  validCheck = {
    firstName:false,
    lastName:false,
    email:false,
    password:false,
  }

  errorMessage = {
    firstName:'',
    lastName:'',
    email:'',
    password:'',
  }
  constructor(private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private usersService: UsersService){}

  handelAuthType():void{
    this.authSignIn = !this.authSignIn;
  }

  token:TokenResponse|null=null;

  userLogin : UserLogin | undefined;
  manageLogin():void{ 
    this.formValidate = true;
    
    let userData = {
      email: this.authForm.value.email,
      password: this.authForm.value.password,
    } 

    this.loginUser(userData as UserLogin);

    if(this.validCheck.email && this.validCheck.password){
     
      console.log("user logged in", this.token);
    }
    else{
      console.log("please input valid user credentials");
    }
  }

  manageSignUp():void{
    this.formValidate = true;

    let userData = {
      firstName: this.authForm.value.firstName,
      lastName: this.authForm.value.lastName,
      username: this.authForm.value.email,
      email: this.authForm.value.email,
      password: this.authForm.value.password,
    } 

    console.log("sign up ", this.validCheck);
  
    if(this.validCheck.firstName && this.validCheck.lastName && this.validCheck.email && this.validCheck.password){
      console.log("user account created");
      this.sigupUser(userData as UserSignUp);
    }
    else{
      console.log("please input valid user data");
    }
  }

  // managePasswordType(): string{
  //   this.showPassword = !this.showPassword;
  //   return !this.showPassword?"text":"password";
  // }

  // suggested change
  // when using suggested change on html template ince showPasword value will determine value

  managePasswordType(){
    this.showPassword = !this.showPassword;
  }
  
  navigateToHomePage(): number {
    this.router.navigate(['/','dashboard']);
    return 0;
  }

  onInput(){
    console.log(this.authForm.value);
    this.authFormValidate("email");
    this.authFormValidate("password");  
  }

  authFormValidate(name: string){ 
    switch(name){

      case "firstName" : {
        const minLength = 3;
        const firstName: string = this.authForm.value.firstName ? this.authForm.value.firstName : "";
        const validate =  firstName.length >= minLength;
        this.validCheck.firstName = validate;
        this.errorMessage.firstName = validate? "" : "invalid firstname";
      }
      break;

      case "lastName" : {
        const minLength = 3;
        const lastName: string = this.authForm.value.lastName ? this.authForm.value.lastName : "";
        const validate =  lastName.length >= minLength;
        this.validCheck.lastName = validate;
        this.errorMessage.lastName = validate? "" : "invalid lastname";
        
      }
      break;

      case "email" : {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const email: string = this.authForm.value.email ? this.authForm.value.email : "";
        const validate = emailPattern.test(email);
        this.validCheck.email = validate;
        this.errorMessage.email = validate? "" : "invalid email";
        console.log("email validate",validate);
      }
      break;

      case "password" : {
        const minLength = 8; // Minimum length requirement
        const hasUpperCase = /[A-Z]/; // At least one uppercase letter
        const hasLowerCase = /[a-z]/; // At least one lowercase letter
        const hasDigit = /\d/; // At least one digit
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
        const password: string = this.authForm.value.password ? this.authForm.value.password : "";
        
        const validate =  password.length >= minLength;
        // const validate =  password.length >= minLength &&
        //     hasUpperCase.test(password) &&
        //     hasLowerCase.test(password) &&
        //     hasDigit.test(password) &&
        //     hasSpecialChar.test(password);
          
            console.log("password validate",validate);
          this.validCheck.password = validate;
          this.errorMessage.password = validate? "" : "invalid password";
      }
      break;
    }
  }

  extractPayload(token: string): any {
  
  }

  loginUser(userInfo: UserLogin) {
    this.usersService.userLogin(`http://localhost:8080/login`, userInfo)
      .subscribe({
        next: (data) => {
          console.log(data);
          if(data){
            const decodedJWT = JSON.parse(window.atob(data.token.split('.')[1]));
            localStorage.setItem('jwt_token',data.token);
            // console.log(decodedJWT.roles);
            // console.log(decodedJWT.sub);
            this.authForm.reset();
            this.navigateToDashboard();
          }
         
        },
        error: (error) => {
          console.log("token dosent exist",error);
        },
      });
  }

  sigupUser(userInfo: UserSignUp): void{
    console.log("sigupUser(userInfo: UserSignUp): void{",userInfo);
    this.usersService.userSignUp('http://localhost:8080/signup',userInfo)
    .subscribe({
      next: (data) => {
        console.log("data",data);
        // this.navigateToLogin();
      },
      error: (error) => {
        console.log("user signup",error);
      },
    });
  }

  navigateToLogin(): void {
    this.router.navigate(['/','auth']);
    this.authSignIn = false;
    // showPassword: boolean = true;

  }

  navigateToDashboard(): void {
    this.router.navigate(['/','dashboard']);
  }
  
}
