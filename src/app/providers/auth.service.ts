import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public Auth: AngularFireAuth,
    public afDB: AngularFireDatabase
    ) { }


  login(userDetails) {

   const promise = new Promise((resolve, reject) => {
       this.Auth.auth.signInWithEmailAndPassword(userDetails.Email, userDetails.Password).then(() => {
         resolve(true);
       }).catch((err) => {
         reject(err);
       });
   });
   return promise;
  }

  forgetpassword(userDetails) {
    const promise = new Promise((resolve, reject) => {
      this.Auth.auth.sendPasswordResetEmail(userDetails.Email).then(() => {
        resolve(true);
      }).catch((err) => {
        reject(err);
      });
  });
    return promise;
  }

  register(userDetails) {
    const promise = new Promise((resolve, reject) => {
      this.Auth.auth.createUserWithEmailAndPassword(userDetails.Email, userDetails.Password).then(() => {
        this.afDB.database.ref('Users').push((
          // tslint:disable-next-line: no-unused-expression
             userDetails.userid = this.Auth.auth.currentUser.uid,
                userDetails
              )).then(() => {
            resolve(true);
        }).catch((err) => {
          reject(err);
        });
      });
  });
    return promise;
  }

  logout() {

    let promise = new Promise((resolve, reject) => {
      this.Auth.auth.signOut().then(() => {
        resolve(true);
      });
    }).catch((err) => {
      reject(err);
    });
    return promise;
  }
}
