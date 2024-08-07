import { UsersService } from './services/users.service';
import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { UserComponent } from "./test/user/user.component";

import { HeaderComponent } from './components/header/header.component';
import { GeneralComponent } from './pages/general/general.component';
import { FooterComponent } from './components/footer/footer.component';

import { MaterialModule } from './utils/material/material.module';
// import { SignInComponent } from './authentication/sign-in/sign-in.component';
// import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { DashboardMainComponent } from './pages/dashboard-main/dashboard-main.component';
import { DetailsComponent } from './components/details/details.component';
import { ServerOfflineComponent } from './components/server-offline/server-offline.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { CategoryNewsComponent } from './components/container/category-news/category-news.component';
import { AuthComponent } from './authentication/auth/auth.component';
import { NgModel } from '@angular/forms';
import { DashSidebarComponent } from './dashboard/dash-sidebar/dash-sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NgIf, NgFor, 
    RouterOutlet, RouterModule,
    
    UserComponent, 
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
  // displayAuthPage: boolean = true;

  currentUrl: string = "";
  
  constructor(private router: Router){}
  
  handelAuthPage():void{
    this.displayAuthPage = !this.displayAuthPage;
  }
  

  ngOnInit(){
    this.manageDashboardView();
  }

  manageDashboardView(){
    this.router.events.subscribe(() => {
      this.currentUrl = this.router.url;
      this.urlDashboard = this.currentUrl.includes("dashboard");
    });
  }


}

/*
Header
Container (Main, sideBar)
Main
sideBar
VisualStories
Container (LatestUpdates, sideBar)
LatestUpdates
Footer


ng generate component components/Header
ng generate component components/Container
ng generate component components/Main
ng generate component components/sideBar
ng generate component components/VisualStories
ng generate component components/LatestUpdates
ng generate component components/Footer


*/
