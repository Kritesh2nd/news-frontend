import { CreateArticle } from './../../types';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Article } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private apiService: ApiService) {}
  
  getArticleList = (url: string): Observable<Article[]> => {
    return this.apiService.get(url, {
      headers:{
        contentType:'application/json'
      },
      responseType: 'json'
    }
    );
  };

  getArticleById = (url: string): Observable<Article> => {
    return this.apiService.get(url, {
      headers:{
        contentType:'application/json'
      },
      responseType: 'json'
    }
    );
  };

  createArticle = (url: string, body: CreateArticle): Observable<any> => {    
    return this.apiService.post<any>(url, body);  
  };

  // createArticle = (url: string, body: UserSignUp): Observable<TokenResponse> => {    
  //   return this.apiService.post<TokenResponse>(url, body);  
  // };
  
 

}
