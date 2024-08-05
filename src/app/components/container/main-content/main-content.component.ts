import { Article } from './../../../../types';
import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../../../services/articles.service';

import { NgFor, NgIf } from '@angular/common';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RouterOutlet,RouterModule } from '@angular/router';

import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [
    NgIf, NgFor,
    RouterOutlet, RouterModule,
  ],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent implements OnInit{
  
  articleMiniList: Article[] = [];

  articleCenterMain: Article | undefined;

  articleCenterSecondary: Article | undefined;

  articleRightMiniList: Article[] = [];

  constructor(private articlesService: ArticlesService) {}
  
  
  fetchArticleImageMiniList(pageNumber:number, pageSize: number): Observable<Article[]> {
    return this.articlesService.getArticleList('http://localhost:8080/article/listMiniImage?pagination=true&pageNumber='+pageNumber+'&pageSize='+pageSize)
      .pipe(
        catchError((error) => {
          console.log(error);
          return of([]);
        })
      );
  }

  fetchArticleMiniById(id: number): Observable<Article> {
    return this.articlesService.getArticleById('http://localhost:8080/article/' + id)
      .pipe(
        catchError((error) => {
          console.log(error);
          return of();
        })
      );
  }
  
  ngOnInit(): void {
    
    this.fetchArticleImageMiniList(0,3).subscribe({
      next: (data: Article[]) => {this.articleMiniList = data;},
      error: (error) => {console.log("error");}
    });

    this.fetchArticleImageMiniList(3,4).subscribe({
      next: (data: Article[]) => {this.articleRightMiniList = data;},
      error: (error) => {console.log("error");}
    });
    
    this.fetchArticleMiniById(7).subscribe({
      next: (data: Article) => {this.articleCenterMain = data;},
      error: (error) => {console.log("error");}
    });

    this.fetchArticleMiniById(8).subscribe({
      next: (data: Article) => {this.articleCenterSecondary = data;},
      error: (error) => {console.log("error");}
    });
  }

  generateUUID(): string {
    return uuidv4();
  }
}

