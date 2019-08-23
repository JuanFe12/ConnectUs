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


  
    openFriend(){
      this.NavCtr.navigateRoot('/friends');
   }
  
    requestopen(){
      this.NavCtr.navigateRoot('/requests');
   }
 
    openBlock(){
      this.NavCtr.navigateRoot('/block');
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
