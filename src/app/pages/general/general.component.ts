import { Component } from '@angular/core';
import { HeadlineTitlesComponent } from '../../components/container/headline-titles/headline-titles.component';
import { MainContentComponent } from '../../components/container/main-content/main-content.component';
import { VisualStoriesComponent } from "../../components/container/visual-stories/visual-stories.component";
import { LatestArticlesComponent } from '../../components/container/latest-articles/latest-articles.component';


@Component({
  selector: 'app-general',
  standalone: true,
  imports: [
    HeadlineTitlesComponent, MainContentComponent, VisualStoriesComponent, LatestArticlesComponent,
  ],
  templateUrl: './general.component.html',
  styleUrl: './general.component.scss'
})
export class GeneralComponent {

}
