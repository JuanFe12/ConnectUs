import { Component, OnInit } from '@angular/core';

/* Services */
import { RequestService } from '../../providers/request.service';
import { AuthService } from '../../providers/auth.service';


/*Ui componenta*/
import {  NavController, AlertController, LoadingController, Platform, ToastController } from '@ionic/angular';
@Component({

  selector: 'app-requests',
  templateUrl: './requests.page.html',
  styleUrls: ['./requests.page.scss'],
})
export class RequestsPage implements OnInit {


  public  sentRequests = [];
  public  receivedRequests = [];

  looding = true

  constructor(
    public Request : RequestService,
    public Auth: AuthService,
    public Alert: AlertController,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    private platform: Platform,
    private toastCtrl: ToastController
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
  toast(message){
    let toast =  this.toastCtrl.create({
        
      duration: 8000,
      position: 'top'
    });
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
                    this.deleteSentRequest(userDetails);
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
                  this.deleteReceivedRequest(userDetails);
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

  async deleteSentRequest(userDetails) {

    let toast =  await this.toastCtrl.create({
      
      message: 'Request to ' + userDetails.Name + ' has been deleted',
      duration: 8000,
      position: 'top'
    });

    toast.present()
    this.Request.deleteRequest(userDetails).then(() => {
      if (this.sentRequests.length > 1) {
        this.Request.GetsentRequest().then((res: any) => {
          this.sentRequests = res
          toast.dismiss()
         
        }).catch((err) => {
          toast.dismiss()
          console.log(err);
        })
      } else {
        this.sentRequests = []
        toast.dismiss()

        if (this.receivedRequests.length < 1) {
          this.navCtrl.pop()
        }
      }

    }).catch((err) => {
      toast.dismiss()
      console.log(err);
      
    })  


  }

   async deleteReceivedRequest(userDetails) {
    let toast =  await this.toastCtrl.create({
      
      message: 'Request to ' + userDetails.Name + ' has been deleted',
      duration: 8000,
      position: 'top'
    });

    toast.present()
    this.Request.deleteReceivedRequest(userDetails).then(() => {
      if (this.sentRequests.length > 1) {
        this.Request.GetreceivedRequests().then((res: any) => {
          this.receivedRequests = res
          toast.dismiss()
         
        }).catch((err) => {
          toast.dismiss()
          console.log(err);
        })
      } else {
        this.receivedRequests = []
        toast.dismiss()

        if (this.sentRequests.length < 1) {
          this.navCtrl.pop()
        }
      }

    }).catch((err) => {
      toast.dismiss()
      console.log(err);
      
    })  
  

  }
  
/*
  delete(userDetails){
    this.Request.deleteRequest(userDetails).then(() =>{
      console.log('You and ' + userDetails.Name +'Request has been delete');
      
    })
  }*/

  accept(userDetails){
    this.Request.AcceptRequest(userDetails).then(() =>{
      console.log('You and ' + userDetails.Name + ' become friends');
    })
  }

  block(userDetails){
    console.log('Your Request has been block');
    
  }
}
