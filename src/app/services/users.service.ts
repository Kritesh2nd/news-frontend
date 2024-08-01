import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { TokenResponse, User, BasicResponse } from '../../types';
import { Observable } from 'rxjs';

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

  // Getting token from the API 
  userLogin (url: string): Observable<TokenResponse> {
    return this.apiService.post(url, {
      responseType: 'json',
    });
  };

  // Getting Basic response from API
  userSignUp = (url: string): Observable<BasicResponse> => {
    return this.apiService.post(url, {
      responseType: 'json',
    });
  };
}
