import { Component, OnInit } from '@angular/core';

import { UsersService } from '../../providers/users.service';
import { AuthService } from '../../providers/auth.service';
import { RequestService } from '../../providers/request.service';


import { NavController, AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  users = [];
  constructor(
    public userservice: UsersService,
    public authservice: AuthService,
    public Navcoon: NavController,
    public alert: AlertController,
    public request: RequestService,
    public loadctr: LoadingController
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

  async  showUserConfirmation (userDetails) {  
    const confirm = await  this.alert.create({
      header: 'Send request',
      message: 'The request will be send to ' + userDetails.Name,
      buttons:[
               {
                 text:'Disgree',
                 handler: () => {
                   this.disgree();
                   
                 }
              },
              {
                text:'Agree',
                handler: () => {
                  this.agree(userDetails);
                  
                }
             }
      ]
    });
    await confirm.present();

  }

  async agree (userDetails) {
    const loading = await this.loadctr.create({
      spinner: 'lines',
      duration: 2000,
      message: 'Sending Request ' + userDetails.Name,
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    loading.present();
    this.request.makeRquest(userDetails).then(() =>{
      if(this.users.length > 1){
             this.userservice.GetAllUsers().then((res: any) =>{
               this.users = res
                console.log('Request has been sent to ' + userDetails.Name);
             }).catch((err) =>{
               loading.dismiss();
                     console.log(err);
             })
      }else{
        loading.dismiss();
        this.Navcoon.pop()
        console.log('Request has been sent to ' + userDetails.Name);
      }
    }).catch((err) =>{
      loading.dismiss();
      console.log(err);
    })
  }

  disgree () {
    console.log('Disgree clicked');
  }
}
