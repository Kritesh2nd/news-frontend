import { NgFor } from '@angular/common';
import { Article } from './../../../../types';
import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../../../services/articles.service';

@Component({
  selector: 'app-headline-titles',
  standalone: true,
  imports: [NgFor],
  templateUrl: './headline-titles.component.html',
  styleUrl: './headline-titles.component.scss'
})
export class HeadlineTitlesComponent implements OnInit {

  headlines: String[] = [];

  ngOnInit(): void {
    this.fetchHeadline();
  }

  constructor(private articlesService: ArticlesService) { }

  fetchHeadline(): void {
    this.articlesService.getArticleList('http://localhost:8080/article/listTitle')
      .subscribe({
        next: (data: Article[]) => {
          this.headlines = data.map(dt => dt.title);
        },
        error: (error) => {
          console.log("error", error);
        },
      });
  }

}
