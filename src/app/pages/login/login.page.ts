import { NavController, LoadingController, Platform, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../providers/auth.service';

declare let window: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  userDetails = {
    Email: '',
    Password: ''
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

  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }
  async login() {

    const loading = await this.loadctr.create({
      spinner: 'lines',
      duration: 5000,
      message: 'Please wait...',
      translucent: true,
    });
    loading.present();
    this.Auth.login(this.userDetails).then(() => {
       loading.dismiss();
       this.NavCtr.navigateRoot('/tabs/chat');
       window.localStorage.setItem('Userstate', 'LogedIn');
       window.localStorage.setItem('userid', this.Auth.Auth.auth.currentUser.uid);

    }).catch((err) => {
      loading.dismiss();
      const error = err.message;
      this.presentToast(error);
    });
  }

  register() {
  }

  forgotpassword() {
  }
}
