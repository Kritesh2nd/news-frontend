import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Category } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private apiService: ApiService) { }

  getCategoryList = (url: string): Observable<Category[]> => {
    return this.apiService.get(url, {
      headers: {
        contentType: 'application/json'
      },
      responseType: 'json'
    }
    );
  };

}
