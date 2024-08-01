import { UsersService } from './../../services/users.service';
import { NgIf } from '@angular/common';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { MaterialModule } from '../../utils/material/material.module';
import { Router } from '@angular/router';
import { User, UserAuth, UserLogin, UserSignUp, TokenResponse } from '../../../types';
import { FormBuilder, FormsModule, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
// import {jwt_decode} from 'jwt-decode';
// import { jwt } from 'jsonwebtoken';

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
export class AuthComponent {

  authSignIn: boolean = true;

  showPassword: boolean = false;

  formValidate: boolean = false;
  

  

  @Output() manageAuthPage = new EventEmitter();
  manageAuthPageClose(){
    this.manageAuthPage.emit( );
  }

  authForm = this.formBuilder.group({
    firstName:'',
    lastName:'',
    email:'',
    password:'',
  })

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
  constructor(private router: Router, private formBuilder: FormBuilder, private usersService: UsersService){}



  handelAuthType():void{
    this.authSignIn = !this.authSignIn;
  }

  token:TokenResponse|null=null;

  fetchUserToken(){
    return this.usersService.userLogin('http://localhost:8080/login')
      .pipe(
        catchError((error) => {
          console.log(error);
          return of([]);
        })
      )
      // .subscribe((t)=>{if(t){
      //   this.token = t as TokenResponse
      // }});
  }

  manageLogin():void{ 
    this.formValidate = true;

    if(this.validCheck.email && this.validCheck.password){
      this.fetchUserToken()
      .p
      .subscribe({
        next:(data) => {
          data = data as TokenResponse;
          console.log(data);
        },
        error: (error) => {
          console.log(error);
        },
      })

      // .subscribe((t)=>{if(t){
      //   this.token = t as TokenResponse
      // }});
      console.log("user logged in", this.token);
    }
    else{
      console.log("please input valid user credentials");
    }


  }

  manageSignUp():void{
    this.formValidate = true;

    if(this.validCheck.firstName && this.validCheck.lastName && this.validCheck.email && this.validCheck.password){
      console.log("user account created");
    }
    else{
      console.log("please input valid user data");
    }
  }

  managePasswordType(): string{
    this.showPassword = !this.showPassword;
    return !this.showPassword?"text":"password";
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
        
        const validate =  password.length >= minLength &&
            hasUpperCase.test(password) &&
            hasLowerCase.test(password) &&
            hasDigit.test(password) &&
            hasSpecialChar.test(password);
        // console.log(
        //   "password",password,
        //   "lenght",password.length >= minLength,
        //   "upper",hasUpperCase.test(password),
        //   "lower",hasLowerCase.test(password),
        //   "digit",hasDigit.test(password),
        //   "special",hasSpecialChar.test(password)
        // );
          console.log("password validate",validate);
          this.validCheck.password = validate;
          this.errorMessage.password = validate? "" : "invalid password";
      }
      break;
    }
  }

  extractPayload(token: string): any {
    // try {
    //   // Decode the token without verifying
    //   const decodedToken = jwt.decode(token);
  
    //   if (decodedToken && typeof decodedToken === 'object') {
    //     return decodedToken;
    //   } else {
    //     throw new Error('Invalid token');
    //   }
    // } catch (error) {
    //   console.error('Error decoding token:', error);
    //   return null;
    // }
  }
  
//   getDecodedAccessToken(token: string): any {
//     try {
//       return jwt_decode(token);
//     } catch(Error) {
//       return null;
//     }
//   }
}
