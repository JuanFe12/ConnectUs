import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  userid = window.localStorage.getItem('userid');
  

constructor(
    public Auth: AngularFireAuth,
    public afDB: AngularFireDatabase
  ) { }


  GetAllUsers() {
    const promise = new Promise ((resolve, reject) => {
    this.afDB.database.ref('Users').once('value', snap => {
      const res = snap.val();
      const array = [];
      // tslint:disable-next-line: forin
      for (const i in res) {
        array.push(res[i]);
      }

      for (let aa = array.length - 1; aa >= 0; aa--) {
           if (array[aa].userid === this.userid) {
            array.splice(aa, 1);
           }
      }

      this.afDB.database.ref('request').child(this.userid).child('Sent Requests').once('value' , snap =>{
        const res = snap.val();
        const array2 = [];
        // tslint:disable-next-line: forin
        for (const i in res) {
          array2.push(res[i]);
          console.log(res);
          console.log(array2);
          
          
        }
      for (let aa = array.length - 1; aa >= 0;  aa--) {
        for (let bb = 0; bb < array2.length; bb++) {
          if (array[aa].userid === array2[bb].Id) {
                    array.splice(aa, 1);
          }
     }
      }
    })
    this.afDB.database.ref('request').child(this.userid).child('Received Requests').once('value' , snap =>{
      const res = snap.val();
      const array3 = [];
      // tslint:disable-next-line: forin
      for (const i in res) {
        array3.push(res[i]);
        console.log(res);
        console.log(array3);
        
        
      }
      console.log(array3);
      
    for (let aa = array.length - 1; aa >= 0;  aa--) {
      for (let bb = 0; bb < array3.length; bb++) {
        if (array[aa].userid === array3[bb].userid) {
                  array.splice(aa, 1);
        }
   }
    }
  })


  this.afDB.database.ref('Friends').child(this.userid).once('value', snap =>{
            const res = snap.val();
            const array4 = [];
            // tslint:disable-next-line: forin
            for (const i in res) {
            array4.push(res[i]);
              console.log(res);
            }
                  for (let aa = array.length - 1; aa >= 0;  aa--) {
                    for (let bb = 0; bb < array4.length; bb++) {
                      if (array[aa].userid ===array4[bb].userid) {
                                array.splice(aa, 1);
                      }
                }
                  }

                   resolve(array)
                }).catch((err)=>{
                  
                    reject(err);
                })
              }).catch((err)=>{
              
                  reject(err);
            }).catch((err)=>{
              
              reject(err);
        }).catch((err)=>{
              
          reject(err);
    })

    });
    return promise;
  }
}
