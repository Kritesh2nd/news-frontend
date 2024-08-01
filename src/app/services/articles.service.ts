import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { ArticleRequest, Article } from '../../types';

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
  
 

}
