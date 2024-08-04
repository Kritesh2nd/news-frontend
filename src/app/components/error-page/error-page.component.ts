import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-error-page',
  standalone: true,
  imports: [],
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.scss'
})
export class ErrorPageComponent implements OnInit{

  constructor (private router: Router){
    
  }
  ngOnInit(): void {
    console.log("hello from error");
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        
        const aa = event.url.includes('dashboard');
        
        const bb = event.url.includes('add');
        console.log(aa,bb);

      }
      console.log(event);
    });
  }

  handelLink(link: string):string{
    return "/"+link;
  }
}
