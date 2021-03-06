import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, Platform, ToastController } from '@ionic/angular';
import { AuthService } from '../../providers/auth.service';
declare let window: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})


export class RegisterPage implements OnInit {

  userDetails = {
    Name: '',
    Email: '',
    Phone: '',
    userid: ''
  };

  constructor(
    public Auth: AuthService,
    public NavCtr: NavController,
    public loadctr: LoadingController,
    private platform: Platform,
    public toastController: ToastController
  ) { }

  ngOnInit() {
  }

  showToast(message) {
    this.platform.ready().then(() => {
      window.plugins.Toast.Toast.show(message, 'Inval', 'bottom');
    });
  }
  async register() {
    const loading = await this.loadctr.create({
      spinner: 'lines',
      duration: 5000,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    loading.present();
    this.Auth.register(this.userDetails).then(() => {
       loading.dismiss();
       this.NavCtr.navigateRoot('/login');
       window.localStorage.setItem('Userstate', 'LogedIn');
       window.localStorage.setItem('userid', this.Auth.Auth.auth.currentUser.uid);

    }).catch((err) => {
      loading.dismiss();
      const error = err.message;
      this.showToast(error);
    });
  }


}
