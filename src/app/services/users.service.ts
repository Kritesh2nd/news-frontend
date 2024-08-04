import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { TokenResponse, User, BasicResponse, UserLogin, UserSignUp } from '../../types';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private apiService: ApiService) {}

  // Getting user list from the API
  getUsers = (url: string): Observable<User[]> => {
    return this.apiService.get(url, {
      responseType: 'json',
    });
  };

  // Adding adding user
  userLogin = (url: string, body: any): Observable<TokenResponse> => {
    const credentials = btoa(`${body.email}:${body.password}`);
    const headers = new HttpHeaders({
      'Authorization': `Basic ${credentials}`
    });
    return this.apiService.post<TokenResponse>(url, {}, { headers });  
  };

  userSignUp = (url: string, body: UserSignUp): Observable<any> => {    
    return this.apiService.post<any>(url, body);  
  };

  

  
}
