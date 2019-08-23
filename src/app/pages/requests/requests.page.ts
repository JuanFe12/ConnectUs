import { Component, OnInit } from '@angular/core';

/* Services */
import { RequestService } from '../../providers/request.service';


/*Ui componenta*/

import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-requests',
  templateUrl: './requests.page.html',
  styleUrls: ['./requests.page.scss'],
})
export class RequestsPage implements OnInit {


  public  sentRequests = [];
  public  receivedRequests = [];

  constructor(
    public Request : RequestService,
    public Alert: AlertController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
   this.Request.GetreceivedRequests().then((res: any) =>{
       this.receivedRequests = res 
   })

   this.Request.GetsentRequest().then((res: any) =>{
    this.sentRequests = res 
})
  }

  async showsentrequest(userDetails){
    const confirm = await  this.Alert.create({
      header: 'Request',
      message: 'You have been sent a request to ' + userDetails.Name,
      buttons:[
               {
                 text:'Cancel',
                 handler: () => {
                   console.log('cancel');
                 }
              },
              {
                text:'Delete Request',
                handler: () => {
                  console.log('Delete Request');
                }
             },
             {
              text:'Block',
              handler: () => {
                console.log('Block');
              }
           }
      ]
    });
    await confirm.present();
  }

  async showreceivedrequest(userDetails){
    const confirm = await  this.Alert.create({
      header: 'Request',
      message: 'Request from ' + userDetails.Name,
      buttons:[
               {
                 text:'Cancel',
                 handler: () => {
                  console.log('Cancel');
                 }
              },
              {
                text:'Remove',
                handler: () => {
                 console.log('Remove');
                }
             },
              {
                text:'Block',
                handler: () => {
                  console.log('Block');
                }
             },
             {
              text:'Accept',
              handler: () => {
                 console.log('Aceept');
              }
           }
      ]
    });
    await confirm.present();
  }

}
