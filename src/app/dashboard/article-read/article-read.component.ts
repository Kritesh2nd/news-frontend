import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TableModule } from 'primeng/table';
import { Article, Category } from '../../../types';
import { catchError, Observable, of } from 'rxjs';
import { FormsModule } from '@angular/forms';

import { ArticlesService } from '../../services/articles.service';
import { PaginatorModule } from 'primeng/paginator';
import { DropdownModule } from 'primeng/dropdown';
import { MaterialModule } from '../../utils/material/material.module';
import { CategoryService } from '../../services/category.service';


interface Pagi {
  id: number,
  select: boolean,
}
@Component({
  selector: 'app-article-read',
  standalone: true,
  imports: [
    NgFor, NgIf, NgClass,
    RouterOutlet, RouterModule,
    FormsModule, DropdownModule,
    MaterialModule,
  ],
  templateUrl: './article-read.component.html',
  styleUrl: './article-read.component.scss'
})
export class ArticleReadComponent implements OnInit {

  tableData: Article[] = [];
  tableHeaders: string[] = ["SN", "Title", "Author", "Publication date", "Sub Content","Details"];

  pageNumber: number = 0;
  pageCount: number = 5;

  totalArticleCount: number = 0;
  paginationCount:number = 0;
  paginationLoop:Pagi[] = []
  

  dropdownCategory: string[] = [];
  dropdownAuthor: string[] = [];

  

  constructor(
    private categoryService: CategoryService, 
    private articleService: ArticlesService
  ) { }

  ngOnInit(): void {
    this.getArticleData()

    this.runPaginationLoop();

    this.getCategoryList();
  }

  getArticleData() {
    this.fetchArticleTitleList(this.pageNumber,this.pageCount).subscribe({
      next: (data: Article[]) => {
        this.tableData = data;
        console.log("this.tableData",this.tableData);
      },
      error: (error) => { console.log("error in article-read:", error); }
    });
  }

  fetchArticleTitleList(pageNumber: number, pageSize: number): Observable<Article[]> {
    return this.articleService.getArticleList('http://localhost:8080/article/listMain?pagination=true&pageNumber=' + pageNumber + '&pageSize=' + pageSize)
      .pipe(
        catchError((error) => {
          console.log(error);
          return of([]);
        })
      );
  }

  getTotalArticle():number{
    const totalActicleCount = 13;
    return totalActicleCount;
  }

  getPaginationData(pageNum: number):void{
    this.paginationLoop.filter(d => {
      d.select= d.id == pageNum;
      
    })
    this.pageNumber = (pageNum-1)*this.pageCount;
    this.getArticleData();
  }

  handelPaginationCount():void{
    this.totalArticleCount = this.getTotalArticle();
    const temp = this.totalArticleCount / this.pageCount;
    this.paginationCount = temp%1 !== 0 ? Math.ceil(temp) : temp;
  }
  runPaginationLoop(): void {
    this.handelPaginationCount();
    for (let i = 0; i < this.paginationCount; i++) {
      const temp = {
        id:i + 1,
        select: false,
      }
      this.paginationLoop.push(temp);
    }
    this.paginationLoop[0].select = true;
  }
  
  paginationDirection(directionLeft: boolean):void{
    const selectedObject = this.paginationLoop.find(item => item.select === true);
    const selectedId = selectedObject?.select ? selectedObject.id : 0;
    if(directionLeft && selectedId>1 ){
      this.getPaginationData(selectedId-1);
    }
    else if(!directionLeft && selectedId < this.paginationCount ){
      this.getPaginationData(selectedId+1);
    }
  }

  getCategoryList():void{
    this.categoryService.getCategoryList('http://localhost:8080/category/list')
    .subscribe({
      next:(data: Category[]) => {
        console.log("data category",data);
        this.dropdownCategory = data.map(category => category.categoryName);
        console.log(this.dropdownCategory);
      },
      error: (error) => {
        console.log(error);
      },
    })
  }

  getAuthorList():void{
    
    
    this.dropdownCategory = [];
  }



}
//SELECT COUNT(*) AS total_count FROM article;
/*

[
{id:1, selected:true},
{id:2, selected:false},
{id:3, selected:false},
{id:4, selected:false},
]

*/