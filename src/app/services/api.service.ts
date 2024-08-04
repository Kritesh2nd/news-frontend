import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleRequest, Options, User } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) {}

  // Used to make a GET request to the API
  get<T>(url: string, options: Options): Observable<T> {
    return this.httpClient.get<T>(url, options) as Observable<T>;
  }

   // Used to make a POST request to the API
  post<T>(url: string, body: User, options?: Options): Observable<T> {
    return this.httpClient.post<T>(url, body, options) as Observable<T>;
  }



  
}
