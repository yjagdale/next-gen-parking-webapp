import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {HomePage} from '../pages/home/home';
import {RegisterPage} from '../pages/register/register';
import {NewUser} from '../pages/newUser/newUser';
import {UsersPage} from '../pages/users/users';
import {ListPage} from '../pages/list/list';
import {MenuItemService} from '../services/menuItem.service'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  loggedIn:boolean;
  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private menuItemService:MenuItemService) {
    this.initializeApp();
    // used for an example of ngFor and navigation
    this.pages = this.menuItemService.getMenuList();
    this.loggedIn = this.menuItemService.isLoggedIn();
  }

  getMenuList() {
    return this.menuItemService.getMenuList();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  getStatus(){
    return this.menuItemService.isLoggedIn();
  }
}
