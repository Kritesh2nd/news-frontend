import { Component, OnInit } from '@angular/core';
import { Link, sideBar } from '../../../types';
import { NgFor, NgIf } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dash-sidebar',
  standalone: true,
  imports: [
    NgIf, NgFor,
    RouterOutlet, RouterModule,
    
  ],
  templateUrl: './dash-sidebar.component.html',
  styleUrl: './dash-sidebar.component.scss'
})
export class DashSidebarComponent implements OnInit{
  sideBar: Link[] = [];


  constructor (private router: Router){
    this.sideBar = sideBar;
  }
  ngOnInit(): void {
    
  }


  navigateToDashboard(param:string):void {
    this.router.navigate(['/', 'dashboard'], {
      queryParams: {
        page: param,
      }
    });
  }


  LogOut(): void{
    localStorage.removeItem("jwt_token");  
    this.router.navigate(['/']);
  } 
}
