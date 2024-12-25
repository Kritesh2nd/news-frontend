import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { GeneralComponent } from './pages/general/general.component';
import { FooterComponent } from './components/footer/footer.component';

import { MaterialModule } from './utils/material/material.module';
import { DashboardMainComponent } from './pages/dashboard-main/dashboard-main.component';
import { DetailsComponent } from './components/details/details.component';
import { ServerOfflineComponent } from './components/server-offline/server-offline.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { CategoryNewsComponent } from './components/container/category-news/category-news.component';
import { AuthComponent } from './authentication/auth/auth.component';
import { DashSidebarComponent } from './dashboard/dash-sidebar/dash-sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NgIf, NgFor,
    RouterOutlet, RouterModule,
    GeneralComponent, DashboardMainComponent, CategoryNewsComponent,
    ErrorPageComponent, ServerOfflineComponent,
    AuthComponent,
    DashSidebarComponent,
    HeaderComponent, FooterComponent, DetailsComponent,
    MaterialModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  urlDashboard: boolean = false;
  urlCategory: boolean = false;
  displayAuthPage: boolean = false;
  currentUrl: string = "";

  constructor(private router: Router) { }

  handelAuthPage(): void {
    this.displayAuthPage = !this.displayAuthPage;
  }

  ngOnInit() {
    this.manageDashboardView();
  }

  manageDashboardView() {
    this.router.events.subscribe(() => {
      this.currentUrl = this.router.url;
      this.urlDashboard = this.currentUrl.includes("dashboard");
    });
  }

}