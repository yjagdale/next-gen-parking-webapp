import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {ListPage} from '../pages/list/list';
import {RegisterPage} from '../pages/register/register';
import {NewUser} from '../pages/newUser/newUser';
import {UsersPage} from '../pages/users/users';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {CommonUtilsService} from '../services/commonUtils.service'
import {UserService} from '../services/user.service'
import {MenuItemService} from '../services/menuItem.service'
import {AuthService} from '../services/auth.service'
import {HttpUtils} from '../services/http-utils.service'
import {LocalStorageServices} from '../services/localStorage.service'

import {HttpModule} from "@angular/http";
import {IonicStorageModule} from "@ionic/storage";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    RegisterPage,
    NewUser,
    UsersPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    RegisterPage,
    NewUser,
    UsersPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CommonUtilsService,
    UserService,
    AuthService,
    HttpUtils,
    LocalStorageServices,
    MenuItemService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}
