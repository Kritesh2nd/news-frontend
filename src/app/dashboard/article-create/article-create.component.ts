import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashSidebarComponent } from '../dash-sidebar/dash-sidebar.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Category, CreateArticle } from '../../../types';
import { NgFor, NgIf } from '@angular/common';
import { CategoryService } from '../../services/category.service';
import { CapitalizeFirstPipe } from '../../pipes/capitalize-first.pipe';
import { ArticlesService } from '../../services/articles.service';

@Component({
  selector: 'app-article-create',
  standalone: true,
  imports: [
    // RouterOutlet, RouterModule,
    DashSidebarComponent,
    FormsModule,
    CapitalizeFirstPipe,
    NgFor,NgIf, ReactiveFormsModule,
  ],
  templateUrl: './article-create.component.html',
  styleUrl: './article-create.component.scss'
})
export class ArticleCreateComponent implements OnInit{
  
  categoryList : Category[] = [];

  currentUrl: string = "";
  
  createArticle: CreateArticle = {
    title: "",
    shortContent: "",
    content: "",
    category: "",
  };

  constructor(private router: Router, private formBuilder: FormBuilder, private categoryService: CategoryService, private articleService: ArticlesService){}

  articleDataForm = this.formBuilder.group({
    title: "",
    shortContent: "",
    // imageUrl: "",
    content: "",
    category: "",
  })


  ngOnInit(): void {
    this.getCategoryList();
    
    this.currentUrl = this.router.url;
    console.log("hello", this.router.url);
    
    console.log(this.currentUrl.includes("dashboard"));
    console.log(this.currentUrl.includes("article"));
    console.log(this.currentUrl.includes("create"));
    console.log(this.currentUrl.includes("read"));
  }

  
  onSubmit(): void{
    
    this.createArticle = this.articleDataForm.value as CreateArticle;
    
    console.log("this.createArticle",this.createArticle);
    this.createArticleUrl(this.createArticle);
    
    this.articleDataForm.reset();
  }

  createArticleUrl(articleData: CreateArticle): void{
    const articleDataSave = {
      title:articleData.title,
      shortContent:articleData.shortContent,
      content:articleData.content,
      category:articleData.category,
    }
    this.articleService.createArticle('http://localhost:8080/article/addContent',articleDataSave as CreateArticle)
    .subscribe({
      next: (data) => {
        console.log("data",data);
      },
      error: (error) => {
        console.log("articel add",error);
      },
    });
  }
  
  getCategoryList():void{
    console.log("url: http://localhost:8080/category/list ");
    this.categoryService.getCategoryList('http://localhost:8080/category/list')
    .subscribe({
      next:(data: Category[]) => {
        this.categoryList = [...data]
        console.log(this.categoryList);
      },
      error: (error) => {
        console.log(error);
      },
    })
  }

  clearArticle():void{
    this.articleDataForm.reset();
  }

}
