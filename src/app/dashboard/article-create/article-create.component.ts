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
    // RouterOutlet, RouterModule,
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

    if (this.pageType == 'detailArticle') {
      this.setArticleMainById(true);
      // this.articleDataForm.value.title?.disable();

    }
    if (this.pageType == 'updateArticle') {
      this.setArticleMainById(false);
      // this.articleDataForm.value.title?.disable();

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
    console.log("createArticleImageUrl", articleDataSave as CreateArticle, "selected file", this.selectedFile);
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
            console.log("articel add", error);
          },
        });
    }
  }

  createArticleUrl(articleData: CreateArticle): void {
    const articleDataSave = {
      articleId: this.articleDetail.articleId,
      title: articleData.title,
      shortContent: articleData.shortContent,
      content: articleData.content,
      publishedDate: "",
      category: articleData.category,
    }
    console.log("articleDataSave", articleDataSave);
    const addUrl = 'http://localhost:8080/article/addContent';
    const updateUrl = 'http://localhost:8080/article/update';
    let finalUrl = "";
    if (this.pageType == 'createArticle') { finalUrl = addUrl; }
    else if (this.pageType == 'updateArticle') { finalUrl = updateUrl; }
    this.articleService.createArticle(finalUrl, articleDataSave as CreateArticle)
      .subscribe({
        next: (data) => {
          console.log("data", data);
        },
        error: (error) => {
          console.log("articel add", error);
        },
      });
  }

  getCategoryList(): void {
    console.log("url: http://localhost:8080/category/list ");
    this.categoryService.getCategoryList('http://localhost:8080/category/list')
      .subscribe({
        next: (data: Category[]) => {
          this.categoryList = [...data]
          console.log(this.categoryList);
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

      // this.newsId = articleId ? parseInt(articleId) as number : 0;
      // if(this.pageType=='detailsPage')
      // tempArticleId = this.newsId ? this.newsId : this.navigateToHomePage();

      this.fetchArticleMainById(tempArticleId).subscribe({
        next: (data: Article) => {
          this.articleDetail = data;

          this.articleDataForm = this.formBuilder.group({
            // title: this.articleDetail.title as string,
            title: [{ value: this.articleDetail.title as string, disabled: inpDisable }],
            shortContent: [{ value: this.articleDetail.shortContent as string, disabled: inpDisable }],
            // imageUrl: "",
            content: [{ value: this.articleDetail.content as string, disabled: inpDisable }],
            category: [{ value: "sports", disabled: inpDisable }],
          })
        },
        error: (error) => { console.log(error); }
      });


    });
  }

  manageCategory(optionCategory: string, selectedCategor?: string): boolean {
    console.log(optionCategory == selectedCategor, optionCategory, selectedCategor);
    return optionCategory == selectedCategor;
  }

  navigateToHomePage(): number {
    console.log("navigate 8");
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
    console.log("navigate 9");
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


/*


{
   "articleId": 1,
    "title": "Championship Finals Announced",
    "shortContent": "The championship finals will take place next month.",
    "imageUrl": "https://example.com/images/sports1.jpg",
    "content": "The championship finals, which have been highly anticipated, are set to take place next month. Fans are eagerly waiting for the match between the top two teams.",
    "publicationDate": "2024-06-23T10:29:52",
    "category": {
        "categoryName": "politics"
    }
}

  {
    "articleId": 1,
    "title": "Team Wins Championship in Thrilling Final Match",
    "shortContent": "The city celebrated as the team clinched victory in an intense match.",
    "content": "Detailed content about the championship win and reactions from players and fans.",
    "publishedDate": "",
    "category": "sports"
}

*/