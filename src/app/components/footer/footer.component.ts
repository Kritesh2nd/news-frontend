// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-footer',
//   standalone: true,
//   imports: [],
//   templateUrl: './footer.component.html',
//   styleUrl: './footer.component.scss'
// })
// export class FooterComponent {

// }

import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
// import { UsersService } from './../../services/users.service';
import { UsersService } from './../../services/users.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private usersService: UsersService,
  ) { }

  // this.showSuccess("Logged in successfully");

  requestEditor(event: Event) {
    event.preventDefault();

    const apiUrl = 'http://localhost:8080/user/request-editor-role';

    // this.http.get(apiUrl).subscribe({
    //   next: (data) => (
    //     console.log('API ata:', data),
    //     this.showSuccess("Sucessfully requested for editor role")
    //   ),
    //   error: (err) => (
    //     console.log('API Error:', err),
    //     this.showWaring("Failed to requested for editor role")
    //   )
    // });
    this.usersService.requestEditorRole(apiUrl)
      .subscribe({
        next: (data) => {
          if (data) {
            console.log(data)
            this.showSuccess("Sucessfully requested for editor role")
          }

        },
        error: (error) => {
          console.log('API Error:', error)
          this.showWaring("Failed to requested for editor role")
        },
      });
  }

  showSuccess(message: string) {
    this.toastr.success(message, 'Success');
  }

  showWaring(message: string) {
    this.toastr.warning(message, 'Failed');
  }
}
