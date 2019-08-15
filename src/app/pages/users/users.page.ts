import { Component, OnInit } from '@angular/core';

import { UsersService } from '../../providers/users.service';
import { AuthService } from '../../providers/auth.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  users = [];
  constructor(
    public userservice: UsersService,
    public authservice: AuthService
  ) { }

  ngOnInit() {
    this.ionViewAllEnter();
  }

  ionViewAllEnter() {
    this.userservice.GetAllUsers().then((res: any) => {
      this.users = res;
      console.log(this.users);
    }).catch((err) => {
      console.log(err);
    });
  }
}
