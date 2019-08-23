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



  GetsentRequest(){
    var promise = new Promise ((resolve, reject) =>{
      let details =[]
        this.afDB.database.ref('Users').once('value', snap =>{
             var res = snap.val()
             let userDetails = []

             for(var i in res){
                 userDetails.push(res[i])
             }

              this.afDB.database.ref('request').child(this.userid).child('Sent Requests').once('value', snap => {
                   var res = snap.val()
                      let sentarray = []
                   
                          for(var i in res){
                            sentarray.push(res[i].Id)
                          }

                          for( var i in userDetails){
                            for( var ii in sentarray){
                                if(userDetails[i].userid === sentarray[ii].Id){
                                  details.push(userDetails[i]);
                                }
                            }
                        }
                    resolve(details);
                      }).catch((err) =>{
                        reject(err);
                      })
                }).catch((err) =>{
                  reject(err);
                  
                })
            })
            return promise 
    }

  GetreceivedRequests(){
    var promise = new Promise ((resolve, reject) =>{
      let details =[]
        this.afDB.database.ref('Users').once('value', snap =>{
            var res = snap.val()
            let userDetails = []

            for(var i in res){
                userDetails.push(res[i])
            }

              this.afDB.database.ref('request').child(this.userid).child('Received Requests').once('value', snap => {
                  var res = snap.val()
                  let receivedarray = []
                  
                      for(var i in res){
                        receivedarray.push(res[i].Id)
                      }

                      for( var i in userDetails){
                          for( var ii in receivedarray){
                              if(userDetails[i].Id === receivedarray[ii].Id){
                                details.push(userDetails[i]);
                              }
                          }
                      }
                  resolve(details);
              }).catch((err) =>{
                reject(err);
              })
        }).catch((err) =>{
          reject(err);
          
        })
    })
    return promise 
  }

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

  deleteRequest(userDetails){

  }

  AcceptRequest(userDetails){

  }

  blockUser(userDetails){
    
  }
}

