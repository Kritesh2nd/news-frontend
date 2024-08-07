import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TableModule } from 'primeng/table';
import { Article, Category } from '../../../types';
import { catchError, Observable, of } from 'rxjs';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ArticlesService } from '../../services/articles.service';
import { PaginatorModule } from 'primeng/paginator';
import { DropdownModule } from 'primeng/dropdown';
import { MaterialModule } from '../../utils/material/material.module';
import { CategoryService } from '../../services/category.service';
import { CapitalizeFirstPipe } from '../../pipes/capitalize-first.pipe';


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
    ReactiveFormsModule,
    MaterialModule,
    DatePipe,
    CapitalizeFirstPipe,
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
  

  dropdownCategory: any[] = [];
  dropdownAuthor: string[] = [];

  requestArticleType = this.formBuilder.group({
    category:"",
    author:"",
  })
  

  constructor(
    private categoryService: CategoryService, 
    private articleService: ArticlesService,
    private formBuilder: FormBuilder, 
  ) { }

  ngOnInit(): void {
    this.getArticleData()

    // this.runPaginationLoop();
    this.setTotalArticleCount();

    this.getCategoryList();

    
  }

  getArticleData() {
    this.fetchArticleTitleList(this.pageNumber,this.pageCount).subscribe({
      next: (data: Article[]) => {
        this.tableData = data;
      },
      error: (error) => { 
        console.log("error:", error); 
      }
    });
  }

  fetchArticleTitleList(pageNumber: number, pageSize: number): Observable<Article[]> {
    let newUrl = 'http://localhost:8080/article/listMain?pagination=true&pageNumber=' + pageNumber + '&pageSize=' + pageSize
    if(this.requestArticleType.value.category !== "none"){
      newUrl = 'http://localhost:8080/article/listMain?category='+this.requestArticleType.value.category+'&pagination=true&pageNumber=' + pageNumber + '&pageSize=' + pageSize
    }
    return this.articleService.getArticleList(newUrl)
      .pipe(
        catchError((error) => {
          console.log(error);
          return of([]);
        })
      );
  }

  setTotalArticleCount(){
    this.articleService
    .getArticleCount()
    .subscribe({
      next: (data) => {
        this.totalArticleCount = data;
        this.runPaginationLoop()
      },
      error: (error) => {
        console.log(error);
      },
    })
    
  }

  getPaginationData(pageNum: number):void{
    this.paginationLoop.filter(d => {
      d.select= d.id == pageNum;
      
    })
    this.pageNumber = (pageNum-1)*this.pageCount;
    this.getArticleData();
  }

  handelPaginationCount():void{
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
        this.dropdownCategory = data.map(category => category.categoryName);
        
        let tempAuthor = this.requestArticleType.value.author;
        this.requestArticleType = this.formBuilder.group({
          category:"none",
          author:tempAuthor?tempAuthor:"",
        });
      },
      error: (error) => {
        console.log(error);
      },
    })
  }

  formOnSubmit():void{
    this.getArticleData();
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