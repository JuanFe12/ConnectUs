import { Injectable } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  userid = window.localStorage.getItem('userid');

  constructor(
      public Auth: AngularFireAuth,
      public afDB: AngularFireDatabase
    ) { }

  makeRquest(userDetails){
     let promise = new Promise ((resolve, reject) =>{
         this.afDB.database.ref('request').child(this.userid).child('Sent Requests').push({
           Id: userDetails.userid
         }).then(() =>{
           this.afDB.database.ref('request').child(userDetails.userid).child('Received Requests').push({
             Id: this.userid
           }).then(() =>{
             resolve(true)
           })
         })
     })
    return promise  
  }
}

