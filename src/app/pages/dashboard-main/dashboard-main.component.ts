import { Component, OnInit } from '@angular/core';
import { DashSidebarComponent } from '../../dashboard/dash-sidebar/dash-sidebar.component';
import { DashMainSideBarIntf , dashboardSideBarTest } from '../../../utils/constant';
import { Router } from '@angular/router';
import { ArticleCreateComponent } from '../../dashboard/article-create/article-create.component';
import { ArticleReadComponent } from '../../dashboard/article-read/article-read.component';

@Component({
  selector: 'app-dashboard-main',
  standalone: true,
  imports: [
    
    DashSidebarComponent, ArticleCreateComponent, ArticleReadComponent,
  ],
  templateUrl: './dashboard-main.component.html',
  styleUrl: './dashboard-main.component.scss'
})
export class DashboardMainComponent implements OnInit{
  
  dashData : DashMainSideBarIntf[] = [];

  constructor(private router: Router) {
    this.dashData = dashboardSideBarTest;
  }
  ngOnInit(): void {
    const data = localStorage.getItem("jwt_token");
    if(!data){
      this.navigateToHomePage();
    }
    console.log(data);

  }

  navigateToHomePage() {
    this.router.navigate(['/']);
  }


  
}
