import { Routes } from '@angular/router';
import { GeneralComponent } from './pages/general/general.component';
import { DashboardMainComponent } from './pages/dashboard-main/dashboard-main.component';
import { DetailsComponent } from './components/details/details.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { ServerOfflineComponent } from './components/server-offline/server-offline.component';
import { CategoryNewsComponent } from './components/container/category-news/category-news.component';
import { ArticleCreateComponent } from './dashboard/article-create/article-create.component';
import { ArticleReadComponent } from './dashboard/article-read/article-read.component';

export const routes: Routes = [
  {
    path: '',
    component: GeneralComponent,
    
  },
  {
    path: 'request',
    component: GeneralComponent,
  },
  {
    path: 'category',
    component: CategoryNewsComponent,
  },
  {
    path: 'details',
    component: DetailsComponent,
  },
  {
    path: 'dashboard',
    component: DashboardMainComponent,
    
  },
  {
    path: 'offline',
    component: ServerOfflineComponent,
  },
  {
    path: '**',
    component: ErrorPageComponent,
  },

  
];
