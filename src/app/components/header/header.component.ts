import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigaitonComponent } from "../navigaiton/navigaiton.component";
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterOutlet, RouterModule,
    NavigaitonComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output() manageAuthPage = new EventEmitter();

  manageHeaderAuthPage() {
    this.manageAuthPage.emit();
  }

  getFormattedDate = (): string => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };

    const today = new Date();
    return today.toLocaleDateString('en-US', options);
  };

  getQuote = (): string => {
    return "Get busy living or get busy dying";
  }

}
