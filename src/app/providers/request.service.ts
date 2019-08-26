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
      let Details = []
        this.afDB.database.ref('Users').once('value', snap =>{
             var res = snap.val()
             let userDetails = []

             for(var i in res){
                 userDetails.push(res[i])
                 
             }

              this.afDB.database.ref('request').child(this.userid).child('Sent Requests').once('value', snap => {
                   var res = snap.val()
                      let sentArray = []
                   
                          for(var i in res){
                            sentArray.push(res[i])
                            console.log(sentArray);
                            
                          }

                          for( var i in userDetails){
                            for( var ii in sentArray){
                                if(userDetails[i].userid === sentArray[ii].Id){
                                  Details.push(userDetails[i]);
                                    console.log(Details);

                                }
                            }
                        }
                    resolve(Details);
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
                        receivedarray.push(res[i])
                      }

                      for( var i in userDetails){
                          for( var ii in receivedarray){
                              if(userDetails[i].userid === receivedarray[ii].Id){
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
   let promise = new Promise ((resolve, reject) => {
       this.afDB.database.ref('request').child(this.userid).child('Sent Requests').orderByChild('Id').equalTo(userDetails.userid).once('value', snap => {
         
         let res = snap.val()
         let tempstore = Object.keys(res)

          this.afDB.database.ref('request').child(this.userid).child('Sent Requests').child(tempstore[0]).remove().then(() => {
            this.afDB.database.ref('request').child(userDetails.userid).child('Received Requests').orderByChild('Id').equalTo(this.userid).once('value', snap => {
              
              let res = snap.val()
              let tempstore = Object.keys(res)

              this.afDB.database.ref('request').child(this.userid).child('Received Requests').child(tempstore[0]).remove().then(() => {
                  resolve(true)
              }).catch((err) => {
                reject(err)
              })
            }).catch((err) =>{
              reject(err)
           })
          }).catch((err) =>{
            reject(err)
         })
       })
   })
   return promise 
  }

  AcceptRequest(userDetails){
     let promise = new Promise((resolve, reject) =>{
         this.afDB.database.ref('Friends').child(userDetails.Id).push(() =>{
           Id: this.userid
         }).then(() =>{
           this.afDB.database.ref('Friends').child(this.userid).push(() => {
             Id: userDetails.Id
           }).then(() =>{
             this.deleteRequest(userDetails).then(() =>{
               resolve(true)
             }).catch((err) =>{
               reject(err)
             })
           })
         })
     })
    return promise
  }

  blockUser(userDetails){
    
  }
}

