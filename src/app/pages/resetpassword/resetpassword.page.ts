import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, Platform } from '@ionic/angular';
import { AuthService } from '../../providers/auth.service';

declare let window: any
@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.page.html',
  styleUrls: ['./resetpassword.page.scss'],
})
export class ResetpasswordPage implements OnInit {

  userDetails ={
    Email: ''
  }
  
  constructor(
    public Auth: AuthService,
    public NavCtr: NavController,
    public loadctr: LoadingController,
    private platform: Platform
  ) { }

  ngOnInit() {
  }
  showToast(message){
    this.platform.ready().then(()=>{
      window.plugins.Toast.show(message, "short", 'bottom')
    })
  }
  async forgotpassword(){
    const loading = await this.loadctr.create({
      spinner: 'lines',
      duration: 5000,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
     loading.present();
     this.Auth.forgetpassword(this.userDetails).then(() =>{
       loading.dismiss()
       this.showToast('follow your email instructions');
       this.NavCtr.pop

    }).catch((err)=>{
      loading.dismiss()
      let error = err.message
      this.showToast(error);
      
    })
  }
}
