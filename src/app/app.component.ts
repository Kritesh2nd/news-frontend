import { NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
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

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgIf,
    
    RouterOutlet, UserComponent, 
    GeneralComponent, DashboardMainComponent, CategoryNewsComponent,
    ErrorPageComponent, ServerOfflineComponent,
    
    // SignInComponent, SignUpComponent, 
    AuthComponent,
  
    HeaderComponent, FooterComponent, DetailsComponent,

    MaterialModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  

  urlDashboard: boolean = false;

  urlCategory: boolean = false;

  // displayAuthPage: boolean = false;
  displayAuthPage: boolean = true;

  
  constructor(private router: Router){}
  
  handelAuthPage():void{
    this.displayAuthPage = !this.displayAuthPage;
  }
  

  ngOnInit(){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        
        this.urlDashboard = event.url.includes('dashboard');
        
        this.urlCategory = event.url.includes('category');

      }
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
