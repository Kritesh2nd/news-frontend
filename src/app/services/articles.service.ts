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

  getArticleCount = (): Observable<number> => {
    return this.apiService.get("http://localhost:8080/article/count", {
      headers:{
        contentType:'application/json'
      },
      responseType: 'json'
    }
    );
  };

  deleteArticleById = (url: string): Observable<Article> => {
    return this.apiService.post(url, {
      headers:{
        contentType:'application/json'
      },
      responseType: 'json'
    }
    );
  };

  createArticleImage = (apiUrl: string, data: CreateArticle, file: File): Observable<any> => {
    const formData: FormData = new FormData();
    formData.append('img', file, file.name);
    formData.append('form', new Blob([JSON.stringify(data)], {
      type: 'application/json'
    }));
    return this.apiService.post<any>(apiUrl, formData);
  }

  createArticle = (url: string, body: CreateArticle): Observable<any> => {    
    return this.apiService.post<any>(url, body);  
  };

  // createArticle = (url: string, body: UserSignUp): Observable<TokenResponse> => {    
  //   return this.apiService.post<TokenResponse>(url, body);  
  // };
  
 

}
