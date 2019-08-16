import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  UserUid = window.localStorage.getItem('userid');
  

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
           if (array[aa].userid === this.UserUid) {
            array.splice(aa, 1);
           }
      }

      this.afDB.database.ref('request').child(this.UserUid).child('Sent Requests').once('value' , snap =>{
        const res = snap.val();
        const array2 = [];
        // tslint:disable-next-line: forin
        for (const i in res) {
          array2.push(res[i]);
        }
      
        for (let bb = array2.length - 1; bb >= 0; bb--) {
          if (array2[bb].userid === this.UserUid) {
           array.splice(bb, 1);
          }
     }

      })
      resolve(array);
    }).catch((err) => {
      reject(err);
       });
    });
    return promise;
  }
}
