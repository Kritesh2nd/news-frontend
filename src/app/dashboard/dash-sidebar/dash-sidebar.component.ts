import { Component, OnInit } from '@angular/core';
import { Link, LinkParamterts, sideBar } from '../../../types';
import { NgFor, NgIf } from '@angular/common';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';

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
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        
        const aa = event.url.includes('dashboard');
        
        const bb = event.url.includes('add');
        console.log(aa,bb);

      }
    });
  }

  // mangaeLinkParams(params?: LinkParamterts[]): any{
  //   let cat: any;
  //   console.log(params);
  //   cat.setK
  //   cat = {
      
  //   }
  // }

  LogOut(): void{
    localStorage.removeItem("jwt_token");  
    this.router.navigate(['/']);
  } 
}
