import { Injectable } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
@Injectable({
  providedIn: 'root'
})
export class BlockService {
  
  userid = window.localStorage.getItem('userid');

  constructor(
      public Auth: AngularFireAuth,
      public afDB: AngularFireDatabase
    ) { }
}
