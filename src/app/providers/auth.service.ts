import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public Auth: AngularFireAuth, 
    public afDB: AngularFireDatabase
    ) { }


  login(userDetails){

   let promise = new Promise((resolve,reject) =>{
       this.Auth.auth.signInWithEmailAndPassword(userDetails.Email, userDetails.Password).then(() =>{
         resolve(true)
       }).catch((err) =>{
         reject(err)
       })
   })
     return promise
  }

  forgetpassword(userDetails){
    let promise = new Promise((resolve,reject) =>{
      this.Auth.auth.sendPasswordResetEmail(userDetails.Email).then(() =>{
        resolve(true)
      }).catch((err) =>{
        reject(err)
      })
  })
    return promise
  }

  register(userDetails){
    let promise = new Promise((resolve,reject) =>{
      this.Auth.auth.createUserWithEmailAndPassword(userDetails.Email, userDetails.Password).then(() =>{
        this.afDB.database.ref("Users").child(this.Auth.auth.currentUser.uid).push((   
          this.Auth.auth.currentUser.uid,
          userDetails.Name
)).then(()=>{
          resolve(true)
        }).catch((err) =>{
          reject(err)
        })
      })
  })
    return promise
  }
}
