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
      resolve(array);
    }).catch((err) => {
      reject(err);
       });
    });
    return promise;
  }
}
