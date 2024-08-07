import { Component, OnInit } from '@angular/core';
import { Article } from '../../../../types';
import { NgFor, NgIf } from '@angular/common';
import { ArticlesService } from '../../../services/articles.service';
import { catchError, Observable, of } from 'rxjs';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-visual-stories',
  standalone: true,
  imports: [
    NgIf, NgFor,
    RouterOutlet, RouterModule,
  ],
  templateUrl: './visual-stories.component.html',
  styleUrl: './visual-stories.component.scss'
})
export class VisualStoriesComponent implements OnInit{
  
  visualTilteList: Article[] = [];

  constructor(private router: Router,private articlesService: ArticlesService) {}

  fetchArticleImageTileList(pageNumber:number, pageSize: number): Observable<Article[]> {
    return this.articlesService.getArticleList('http://localhost:8080/article/listTitleImage?pagination=true&pageNumber='+pageNumber+'&pageSize='+pageSize)
      .pipe(
        catchError((error) => {
          console.log(error);
          return of([]);
        })
      );
  }

  ngOnInit(): void {

    this.fetchArticleImageTileList(0,4).subscribe({
      next: (data: Article[]) => {this.visualTilteList = data;},
      error: (error) => {console.log(error);this.navigateToOfflinePage();}
    });

  }

  generateUUID(): string {
    return uuidv4();
  }

  navigateToOfflinePage(): void {
    this.router.navigate(['/','offline']);
  }

}
