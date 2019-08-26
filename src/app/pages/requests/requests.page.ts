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


   this.Request.GetsentRequest().then((res: any) =>{
    this.sentRequests = res 
})

  this.Request.GetreceivedRequests().then((res: any) =>{
    this.receivedRequests = res 
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
                    this.delete(userDetails);
                }
             },
             {
              text:'Block to ' + userDetails.Name,
              handler: () => {
                console.log('Block');
                this.block(userDetails)
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
                text:'Delete Request',
                handler: () => {
                  this.delete(userDetails);
                }
             },
              {
                text:'Block to ' + userDetails.Name,
                handler: () => {
                  this.block(userDetails)
                }
             },
             {
              text:'Accept',
              handler: () => {
                 this.accept(userDetails)
              }
           }
      ]
    });
    await confirm.present();
  }

  delete(userDetails){
    this.Request.deleteRequest(userDetails).then(() =>{
      console.log('Request has been delete');
      
    })
  }

  accept(userDetails){
    this.Request.AcceptRequest(userDetails).then(() =>{
      console.log('You and ' + userDetails.Name + ' become friends');
    })
  }

  block(userDetails){
    console.log('Your Request has been block');
    
  }
}
