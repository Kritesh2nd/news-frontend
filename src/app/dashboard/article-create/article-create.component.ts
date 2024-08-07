import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { DashSidebarComponent } from '../dash-sidebar/dash-sidebar.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Article, Category, CreateArticle } from '../../../types';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { CategoryService } from '../../services/category.service';
import { CapitalizeFirstPipe } from '../../pipes/capitalize-first.pipe';
import { ArticlesService } from '../../services/articles.service';
import { catchError, Observable, of } from 'rxjs';

@Component({
  selector: 'app-article-create',
  standalone: true,
  imports: [
    DashSidebarComponent,
    FormsModule,
    CapitalizeFirstPipe,
    NgFor, NgIf, NgClass,
    ReactiveFormsModule,
    RouterOutlet, RouterModule,
  ],
  templateUrl: './article-create.component.html',
  styleUrl: './article-create.component.scss'
})
export class ArticleCreateComponent implements OnInit {
  @Input() pageType: string = "";

  deleteActive: boolean = false;
  newsId: number = 0;

  selectedFile: File | null = null;

  selectedCateory: string = "sports";

  articleDetail: Article = {
    articleId: 0,
    title: "",
    authorFirstName: "",
    authorLastName: "",
    shortContent: "",
    content: "",
    imageUrl: "",
    publishedDate: "",
    category: "business",
  };

  categoryList: Category[] = [];

  currentUrl: string = "";

  createArticle: CreateArticle = {
    title: "",
    shortContent: "",
    content: "",
    category: "",
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private articleService: ArticlesService
  ) { }

  articleDataForm = this.formBuilder.group({
    title: "",
    shortContent: "",
    content: "",
    category: "",
  })


  ngOnInit(): void {
    this.getCategoryList();

    this.currentUrl = this.router.url;

    if (this.pageType == 'detailArticle') {
      this.setArticleMainById(true);

    }
    if (this.pageType == 'updateArticle') {
      this.setArticleMainById(false);
    }
  }


  onSubmit(): void {
    this.createArticle = this.articleDataForm.value as CreateArticle;
    this.createArticleImageUrl(this.createArticle)
    // this.createArticleUrl(this.createArticle);
    this.articleDataForm.reset();
  }

  createArticleImageUrl(articleData: CreateArticle): void {

    const articleDataSave = {
      articleId: this.articleDetail.articleId,
      title: articleData.title,
      shortContent: articleData.shortContent,
      content: articleData.content,
      publishedDate: "",
      category: articleData.category,
    }
    const addUrl = 'http://localhost:8080/article/add';
    const updateUrl = 'http://localhost:8080/article/update';
    let finalUrl = "";
    if (this.pageType == 'createArticle') { finalUrl = addUrl; }
    else if (this.pageType == 'updateArticle') { finalUrl = updateUrl; }
    if (this.selectedFile) {
      this.articleService
        .createArticleImage(finalUrl, articleDataSave as CreateArticle, this.selectedFile)
        .subscribe({
          next: (data) => {
            console.log("data", data);
          },
          error: (error) => {
            console.log("error", error);
          },
        });
    }
  }

  // createArticleUrl(articleData: CreateArticle): void {
  //   const articleDataSave = {
  //     articleId: this.articleDetail.articleId,
  //     title: articleData.title,
  //     shortContent: articleData.shortContent,
  //     content: articleData.content,
  //     publishedDate: "",
  //     category: articleData.category,
  //   }
  //   const addUrl = 'http://localhost:8080/article/addContent';
  //   const updateUrl = 'http://localhost:8080/article/update';
  //   let finalUrl = "";
  //   if (this.pageType == 'createArticle') { finalUrl = addUrl; }
  //   else if (this.pageType == 'updateArticle') { finalUrl = updateUrl; }
  //   this.articleService.createArticle(finalUrl, articleDataSave as CreateArticle)
  //     .subscribe({
  //       next: (data) => {
  //         console.log("data", data);
  //       },
  //       error: (error) => {
  //         console.log("error", error);
  //       },
  //     });
  // }

  getCategoryList(): void {
    this.categoryService.getCategoryList('http://localhost:8080/category/list')
      .subscribe({
        next: (data: Category[]) => {
          this.categoryList = [...data]
        },
        error: (error) => {
          console.log(error);
        },
      })
  }

  clearArticle(): void {
    this.articleDataForm.reset();
  }

  fetchArticleMainById(id: number): Observable<Article> {
    return this.articleService.getArticleById('http://localhost:8080/article/' + id)
      .pipe(
        catchError((error) => {
          console.log(error);
          return of();
        })
      );
  }

  setArticleMainById(inpDisable: boolean): void {
    let tempArticleId: number;
    this.route.queryParamMap.subscribe(params => {
      const articleId = params.get('newsId');

      this.newsId = articleId ? parseInt(articleId) as number : 0;
      
        tempArticleId = this.newsId ? this.newsId : 0;

        this.fetchArticleMainById(tempArticleId).subscribe({
          next: (data: Article) => {
            this.articleDetail = data;

            this.articleDataForm = this.formBuilder.group({
              title: [{ value: this.articleDetail.title as string, disabled: inpDisable }],
              shortContent: [{ value: this.articleDetail.shortContent as string, disabled: inpDisable }],
              content: [{ value: this.articleDetail.content as string, disabled: inpDisable }],
              category: [{ value: "sports", disabled: inpDisable }],
            })
          },
          error: (error) => {
            console.log(error);
          }
        });

    });
  }

  manageCategory(optionCategory: string, selectedCategor?: string): boolean {
    return optionCategory == selectedCategor;
  }

  navigateToHomePage(): number {
    this.router.navigate(['/']);
    return 0;
  }

  deleteActivate(): void {
    this.deleteActive = !this.deleteActive;
  }

  deleteThisArticle(): void {
    this.articleService
      .deleteArticleById('http://localhost:8080/article/delete/' + this.newsId)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.deleteActivate();
          this.navigateToReadArticle();
        },
        error: (error) => {
          console.log(error);
        },
      })
  }

  navigateToReadArticle(): number {
    this.router.navigate(['/', 'dashboard'], {
      queryParams: {
        page: 'readArticle',
      }
    });
    return 0;
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

}