import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, Platform, ToastController } from '@ionic/angular';
import { UsersPage } from '../users/users.page';
import { UsersService } from '../../providers/users.service';




@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  users = [];

  constructor(
    public NavCtr: NavController,
    public userservice: UsersService

  ) { }

  ngOnInit() {
  }

  OpenUserPage() {
    this.NavCtr.navigateRoot('users');
   }
}
