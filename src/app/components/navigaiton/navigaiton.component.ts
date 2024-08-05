import { LowerCasePipe, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Article, Category } from "../../../types";
import { RouterOutlet, RouterModule, Router }   from '@angular/router';
import { MaterialModule } from '../../utils/material/material.module';

import { CategoryService } from './../../services/category.service';
import { ArticlesService } from '../../services/articles.service';

import { FormsModule } from '@angular/forms';
import { CapitalizeFirstPipe } from '../../pipes/capitalize-first.pipe';
import { HighlightKeywordDirective } from '../../directive/highlight-keyword.directive';

import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subscription } from 'rxjs'; 
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

// import { cube } from "../../../assets/icons";

@Component({
  selector: 'app-navigaiton',
  standalone: true,
  imports: [NgFor, NgIf, RouterOutlet, RouterModule, LowerCasePipe, MaterialModule, FormsModule,
    CapitalizeFirstPipe, HighlightKeywordDirective,
  ],
  templateUrl: './navigaiton.component.html',
  styleUrl: './navigaiton.component.scss'
})
export class NavigaitonComponent implements OnInit{
  
  @Input() keyword: string = "";

  @Output() manageAuthPage = new EventEmitter();
  manageAuthNavigationPage(){
    const token = localStorage.getItem("jwt_token");
    if(token){
      this.navigateToDashboard();
    }
    else{
      this.manageAuthPage.emit( );
    }
  }

  tempArticleTilteList: Article[] = [];

  articleTilteList: Article[] = [];

  categoryList : Category[] = [];

  showSearch : boolean = false;

  searchKeyword: string = "";

  searchActive: boolean = false;

  subscription: Subscription | undefined;


  constructor(
    private router: Router,
    private categoryService: CategoryService, 
    private articlesService: ArticlesService
  ) {}

  
  fetchSearchResult():void {

    this.articlesService.getArticleList('http://localhost:8080/article/request?search='+this.searchKeyword)
    .pipe(
      debounceTime(1000),
      distinctUntilChanged(),
    ) 
    .subscribe({
        next: (data: Article[]) => {
          this.tempArticleTilteList = [...data];
          this.manageSearchResult();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  userInput():void{
    this.searchActive = true;
    setTimeout(()=>{this.fetchSearchResult()},1000);
  }

  manageSearchResult(){
    
    const newData = this.tempArticleTilteList
    const oldData = this.articleTilteList
    const checkEqual = _.isEqual(newData,oldData);
    
    if(!checkEqual){
      this.articleTilteList = [...this.tempArticleTilteList]
    }
   
  }

  manageSearch():void {
    this.showSearch = !this.showSearch;
  }

  ngOnInit(): void {
    console.log(this.router.url, "url chek");
    this.categoryService.getCategoryList('http://localhost:8080/category/list')
    .subscribe({
      next:(data: Category[]) => {
        this.categoryList = [...data]
      },
      error: (error) => {
        console.log(error);
      },
    })

    this.fetchSearchResult();

    
  }


  clearSearch(): void{
    this.showSearch = false;
    this.searchKeyword = "";
  }

  navigateToDashboard(){
    this.router.navigate(['/','dashboard']);
  }

  generateUUID(): string {
    return uuidv4();
  }
}

