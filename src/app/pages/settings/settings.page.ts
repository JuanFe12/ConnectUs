import { Component, OnInit } from '@angular/core';
import { NavController} from '@ionic/angular';
import { AuthService } from '../../providers/auth.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(
    public authservice: AuthService,
    public NavCtr: NavController


  ) { }

  ngOnInit() {
  }

  logout() {
  this.authservice.logout().then(() => {
  this.NavCtr.navigateRoot('login');
  window.localStorage.clear();

    }).catch((err) => {
      console.log(err);
});
  }

}
