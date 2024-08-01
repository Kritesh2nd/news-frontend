import { Component } from '@angular/core';
import { DashSidebarComponent } from '../../dashboard/dash-sidebar/dash-sidebar.component';
import { DashMainSideBarIntf , dashboardSideBarTest } from '../../../utils/constant';

@Component({
  selector: 'app-dashboard-main',
  standalone: true,
  imports: [DashSidebarComponent],
  templateUrl: './dashboard-main.component.html',
  styleUrl: './dashboard-main.component.scss'
})
export class DashboardMainComponent {
  
  dashData : DashMainSideBarIntf[] = [];

  constructor() {
    this.dashData = dashboardSideBarTest;
  }
}
