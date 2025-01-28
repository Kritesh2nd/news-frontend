import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { DashSidebarComponent } from '../dash-sidebar/dash-sidebar.component';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Article, Category, CreateArticle } from '../../../types';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { CategoryService } from '../../services/category.service';
import { CapitalizeFirstPipe } from '../../pipes/capitalize-first.pipe';
import { ArticlesService } from '../../services/articles.service';
import { catchError, Observable, of } from 'rxjs';

import { ToastrService } from 'ngx-toastr';

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
    updateImage: false,
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
    private articleService: ArticlesService,
    private toastr: ToastrService,
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
    if (this.articleDataForm.valid) {
      console.log("subimityes");
      this.createArticle = this.articleDataForm.value as CreateArticle;
      this.createArticleImageUrl(this.createArticle)
      this.articleDataForm.reset();
      this.selectedFile = null;
    }
    else {
      this.showFailed("Please fill all the input fields")
    }
  }

  createArticleImageUrl(articleData: CreateArticle): void {

    const articleDataSave = {
      articleId: this.articleDetail.articleId,
      title: articleData.title,
      shortContent: articleData.shortContent,
      content: articleData.content,
      publishedDate: "",
      category: articleData.category,
      updateImage: this.selectedFile != null,
    }
    const addUrl = 'http://localhost:8080/article/add';
    const updateUrl = 'http://localhost:8080/article/update';
    let finalUrl = "";
    let toastMessage = "";
    if (this.pageType == 'createArticle') {
      finalUrl = addUrl;
      toastMessage = "Article created successfully";
    }
    else if (this.pageType == 'updateArticle') {
      finalUrl = updateUrl;
      toastMessage = "Article updated successfully";
    }
    console.log("finalUrl, articleDataSave as CreateArticle, this.selectedFile",finalUrl, articleDataSave as CreateArticle, this.selectedFile)
      this.articleService
        .createArticleImage(finalUrl, articleDataSave as CreateArticle, this.selectedFile)
        .subscribe({
          next: (data) => {
            console.log("article create data", data);
            if (data != null && data.success) {
              this.showSuccess(toastMessage);

              if (this.pageType == 'createArticle') {
                this.navigateToReadArticle();
              }
              else if (this.pageType == 'updateArticle') {
                this.navigateToDetailArticle(articleDataSave.articleId);
              }

            }
            else {
              this.showFailed("Failed to create article");
            }
          },
          error: (error) => {
            console.log("error", error);
            this.showFailed("Failed to create article");
          },
        });
    
  }

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

  navigateToDetailArticle(newsId: number): number {
    this.router.navigate(['/', 'dashboard'], {
      queryParams: {
        page: 'detailArticle',
        newsId: newsId,
      }
    });
    return 0;
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  showSuccess(message: string) {
    this.toastr.success(message, 'Success');
  }

  showFailed(message: string) {
    this.toastr.error(message, 'Failed')
  }

}