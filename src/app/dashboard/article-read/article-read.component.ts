import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-article-read',
  standalone: true,
  imports: [
    NgFor,NgIf,
    RouterOutlet, RouterModule,
  ],
  templateUrl: './article-read.component.html',
  styleUrl: './article-read.component.scss'
})
export class ArticleReadComponent {

}
