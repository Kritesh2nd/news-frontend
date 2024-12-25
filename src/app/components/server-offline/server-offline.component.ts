import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticlesService } from '../../services/articles.service';
import { Article } from '../../../types';

@Component({
  selector: 'app-server-offline',
  standalone: true,
  imports: [],
  templateUrl: './server-offline.component.html',
  styleUrl: './server-offline.component.scss'
})
export class ServerOfflineComponent implements OnInit {

  headlines: String[] = [];

  ngOnInit(): void {
    this.fetchHeadline();
  }

  constructor(private router: Router, private articlesService: ArticlesService) { }

  fetchHeadline(): void {

    this.articlesService.getArticleList('http://localhost:8080/article/listTitle?pagination=true&pageNumber=0&pageSize=1')
      .subscribe({
        next: (data: Article[]) => {
          this.headlines = data.map(dt => dt.title);
          this.navigateToHomePage();
        },
        error: (error) => {
          console.log("error", error);
        },
      });
  }

  navigateToHomePage(): void {
    this.router.navigate(['/']);
  }

}

