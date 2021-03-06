import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {UsersPage} from "../users/users";
import {AuthService} from "../../services/auth.service";
import {LocalStorageServices} from "../../services/localStorage.service";
import {CommonUtilsService} from "../../services/commonUtils.service";
import {RegisterPage} from "../register/register";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  email: string;
  password: string;

  constructor(public navCtrl: NavController, private authService: AuthService, private localStorageServices: LocalStorageServices, private commonUtilsService: CommonUtilsService) {

  }

  login() {
    this.authService.login(this.email, this.password)
      .then((Response) => {
        this.localStorageServices.addItemToLocalStorage('userToken', Response.token);
        this.localStorageServices.setToken(Response.token);
        this.localStorageServices.addItemToLocalStorage('user', Response.user);
        this.commonUtilsService.showToast("Logged In Successfully", "toastSuccess");
        this.navCtrl.setRoot(UsersPage);
      }, (error) => {
        this.commonUtilsService.showToast("Invalid Email or Password", "toastFailed");
      })
  }

  register() {
    this.navCtrl.push(RegisterPage);
  }

  showUserPage() {
    this.navCtrl.push(UsersPage);
  }

}
