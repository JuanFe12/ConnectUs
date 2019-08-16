import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LoginPage } from './pages/login/login.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
    localStorage.removeItem('firebase:previous_websocket_failure');
  }

  rootPage: any = LoginPage;

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.checkUserState();
    });
  }


  checkUserState() {
    const Userstate = window.localStorage.getItem('Userstate');
    // tslint:disable-next-line: triple-equals
    if (Userstate == 'LogedIn') {
      this.rootPage = LoginPage;
    } else {
      this.rootPage = LoginPage;
    }
  }
}
