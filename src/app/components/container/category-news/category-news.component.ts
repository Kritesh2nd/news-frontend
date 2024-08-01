import { Component } from '@angular/core';
import { Article } from '../../../../types';
import { ArticlesService } from '../../../services/articles.service';
import { catchError, Observable, of } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-category-news',
  standalone: true,
  imports: [
    NgIf, NgFor,
    RouterOutlet, RouterModule,
  ],
  templateUrl: './category-news.component.html',
  styleUrl: './category-news.component.scss'
})
export class CategoryNewsComponent {

  categoryNewsList: Article[] = [];

  category: string = "";

  constructor(private router: Router,private route: ActivatedRoute,private articlesService: ArticlesService) {}

  fetchArticleImageMiniList(category:string, pageNumber:number, pageSize: number): Observable<Article[]> {
    return this.articlesService.getArticleList('http://localhost:8080/article/listMiniImage?category='+category+'&pagination=true&pageNumber='+pageNumber+'&pageSize='+pageSize)
      .pipe(
        catchError((error) => {
          console.log(error);
          return of([]);
        })
      );
  }

  fetchArticleImageMiniListNew(){
    this.fetchArticleImageMiniList(this.category,0,10).subscribe({
      next: (data: Article[]) => {this.categoryNewsList = [...data];},
      error: (error) => {console.log(error);}
    });
  }
  ngOnInit(): void {
    
    this.route.queryParamMap.subscribe(params => {
      const category = params.get('value');
      this.category = category ? category : this.navigateToHomePage();
      console.log("category",category,"this.category",this.category,"|");
      
      this.fetchArticleImageMiniListNew();
    });

    

  }

  navigateToHomePage(): string {
    this.router.navigate(['/']);
    return "";
  }

  generateUUID(): string {
    return uuidv4();
  }
}
