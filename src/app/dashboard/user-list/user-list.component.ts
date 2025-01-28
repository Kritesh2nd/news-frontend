import { UsersService } from './../../services/users.service';
import { Component } from '@angular/core';
import { User } from '../../../types';
import { Observable } from 'rxjs';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {

  userList: User[] = [];
  constructor(private usersService: UsersService) { }

  fetchArticleTitleList() {
    const url = "http://localhost:8080/user/request-editor-list"
    this.usersService.getUsers(url)
      .subscribe({
        next: (data) => {
          if (data) {
            console.log("user data",data)
            this.userList = data;
          }
        },
        error: (error) => {
          console.log('API Error:', error)
        },
      });
  }

  acceptEditorRole(id:any){
    console.log("id",id)
    //acceptEditorRole
    const url = "http://localhost:8080/user/updateAuthorityEditor/"+id
    this.usersService.getUsers(url)
      .subscribe({
        next: (data) => {
          if (data) {
            console.log("user data",data) 
          }
        },
        error: (error) => {
          console.log('API Error:', error)
        },
      });
  }

  ngOnInit(): void {
  this.fetchArticleTitleList()
  }

  
}
