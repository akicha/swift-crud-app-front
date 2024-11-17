import {Component, OnInit} from '@angular/core';
import {User} from '../../classes/user/user';
import {CommonModule} from '@angular/common';
import {UserService} from '../../services/user-service/user.service';
import {HeaderComponent} from '../header/header.component';
import {RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [CommonModule, HeaderComponent, RouterLink, FormsModule],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css'
})
export class UserTableComponent implements OnInit {

  users: User [] = [];
  disabledDeleteButton: boolean = true;
  disabledNewUserButton: boolean = false;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  deleteUsers() {
    const selectedUsers = this.users.filter(x => x.selected);
    selectedUsers.map(item => this.userService.deleteUser(item.id).subscribe({
      error: (error: { message: any; }) => {
        console.error('There was an error!', error.message);
      },
      complete: () => {
        window.location.reload();
      }
    }))
    ;
  }

  changeButtonVisibility() {
    const checkedElementsNumber = document.querySelectorAll("input[type='checkbox']:checked").length;
    const checked = checkedElementsNumber > 0;
    this.disabledNewUserButton = checked;
    this.disabledDeleteButton = !checked;
  }

}
