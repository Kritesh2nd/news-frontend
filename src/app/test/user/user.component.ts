import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Article, User } from '../../../types';
import { ArticlesService } from '../../services/articles.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  
  constructor(private usersService: UsersService, private articlesService: ArticlesService) {}

  userList: User[] = [];

  user: User | undefined;

  fetchUsers() {
    this.usersService
      .getUsers('http://localhost:8080/user/list')
      .subscribe({
        next: (data: User[]) => {
          // console.log("user",data)
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  ngOnInit(){
    this.fetchUsers();
  }
}
