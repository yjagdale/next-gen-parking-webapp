import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from "@angular/http";
import { HomePage } from '../pages/home/home';
import { UsersPage } from '../pages/users/users';
import {RegisterPage} from "../pages/register/register";

import { HttpUtils  } from "../services/http-utils.service";
import { LocalStorageServices  } from "../services/localStorage.service";
import { UserService  } from "../services/user.service";
import { AuthService } from "../services/auth.service";
import { IonicStorageModule } from '@ionic/storage';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    UsersPage,
    RegisterPage
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
    UsersPage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpUtils,
    UserService,
    AuthService,
    LocalStorageServices,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
