import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { Article } from '../../../../types';
import { ArticlesService } from '../../../services/articles.service';
import { catchError, Observable, of } from 'rxjs';


@Component({
  selector: 'app-latest-articles',
  standalone: true,
  imports: [
    NgIf, NgFor,
    RouterOutlet, RouterModule, 
  ],
  templateUrl: './latest-articles.component.html',
  styleUrl: './latest-articles.component.scss'
})
export class LatestArticlesComponent implements AfterViewInit{
  
  latestArticlesList: Article[] = [];

  choosenArticle : Article | undefined;

  mostRead : Article[] = [];

  ediotrsPick : Article[] = [];

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

  ngAfterViewInit(): void {
      this.fetchArticleImageMiniList(0,10).subscribe({
      next: (data: Article[]) => {
        this.latestArticlesList = [...data];
      },
      error: (error) => {
        console.log(error);
      }
    });
    
  }

  generateUUID(): string {
    return uuidv4();
  }
}
