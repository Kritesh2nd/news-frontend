import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesService } from '../../services/articles.service';
import { catchError, Observable, of } from 'rxjs';
import { Article } from '../../../types';
import { NgFor, NgIf } from '@angular/common';
import { faker } from '@faker-js/faker';
import { RouterOutlet,RouterModule } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-details',  
  standalone: true,
  imports: [
    NgIf,NgFor,
    RouterOutlet, RouterModule,
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})

export class DetailsComponent implements OnInit {
  
  newsId: number = 0;

  articleDetail : Article | undefined;

  extraArticleContent: string[] = [];

  mostReadArticles: Article[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private articlesService: ArticlesService) {}

  fetchArticleImageTitleList(pageNumber:number, pageSize: number): Observable<Article[]> {
    return this.articlesService.getArticleList('http://localhost:8080/article/listTitleImage?pagination=true&pageNumber='+pageNumber+'&pageSize='+pageSize)
      .pipe(
        catchError((error) => {
          console.log(error);
          return of([]);
        })
      );
  }

  fetchArticleMainById(id: number): Observable<Article> {
    return this.articlesService.getArticleById('http://localhost:8080/article/' + id)
      .pipe(
        catchError((error) => {
          console.log(error);
          return of();
        })
      );
  }

  navigateToHomePage(): number {
    console.log("navigate 5");
    this.router.navigate(['/']);
    return 0;
  }
  
  fetchArticleMiniByIdNew():void{
    this.fetchArticleMainById(this.newsId).subscribe({
      next: (data: Article) => {this.articleDetail = data;},
      error: (error) => {console.log(error);}
    });

    this.generateNewsContent();
  }

  ngOnInit(): void {
    
    this.route.queryParamMap.subscribe(params => {
      const articleId = params.get('newsId');
      this.newsId = articleId ? parseInt(articleId) : this.navigateToHomePage();
      this.fetchArticleMiniByIdNew();
    });

    

    this.fetchArticleImageTitleList(0,6).subscribe({
      next: (data: Article[]) => {this.mostReadArticles = data;},
      error: (error) => {console.log(error);}
    });

  }



  generateNewsContent(){
    const rand: number = this.generateRandomNumber(20, 30);
    this.extraArticleContent = [...this.generateShortParagraphs(rand)];
  }

  generateShortParagraphs(paragraphCount: number): string[] {
    const paragraphs: string[] = [];
    for (let i = 0; i < paragraphCount; i++) {
      paragraphs.push(faker.lorem.paragraph(4));
    }
    return paragraphs;
  }

  generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  generateUUID(): string {
    return uuidv4();
  }
}

