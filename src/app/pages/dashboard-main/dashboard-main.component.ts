import { Component, OnInit } from '@angular/core';
import { DashSidebarComponent } from '../../dashboard/dash-sidebar/dash-sidebar.component';
import { DashMainSideBarIntf, dashboardSideBarTest } from '../../../utils/constant';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleCreateComponent } from '../../dashboard/article-create/article-create.component';
import { ArticleReadComponent } from '../../dashboard/article-read/article-read.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-dashboard-main',
  standalone: true,
  imports: [
    NgIf, NgFor,
    DashSidebarComponent, ArticleCreateComponent, ArticleReadComponent,
  ],
  templateUrl: './dashboard-main.component.html',
  styleUrl: './dashboard-main.component.scss'
})
export class DashboardMainComponent implements OnInit {
  tokenExists: boolean = false;
  dashData: DashMainSideBarIntf[] = [];
  dashPage: string = "";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.dashData = dashboardSideBarTest;
  }
  ngOnInit(): void {
    const data = localStorage.getItem("jwt_token");
    this.tokenExists = data!="";
    if (!data || !this.tokenExists) {
      this.navigateToHomePage();
    }

    this.route.queryParamMap.subscribe(params => {
      const dashPage = params.get('page');
      this.dashPage = dashPage as string;
    });
  }

  navigateToHomePage() {
    this.router.navigate(['/']);
  }

}
