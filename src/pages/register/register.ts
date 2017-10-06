import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {UsersPage} from "../users/users";
import {AuthService} from "../../services/auth.service";
import {CommonUtilsService} from "../../services/commonUtils.service";
import {OnInit} from '@angular/core';


@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  email: string;
  password: string;
  Response: object;
  companyName: string;
  name: string;

  constructor(public navCtrl: NavController, private authService: AuthService, public commonUtilsService: CommonUtilsService) {

  }

  register() {
    if (this.email === "" || this.email === undefined) {
      this.commonUtilsService.showToast("Email Address Is Mandatory", "toastWorning");
    } else if (this.companyName === "" || this.companyName === undefined) {
      this.commonUtilsService.showToast("Company Name Is Mandatory", "toastWorning");
    } else if (this.name === "" || this.name === undefined) {
      this.commonUtilsService.showToast("Name Is Mandatory", "toastWorning");
    } else {
      this.authService.register({
        "email": this.email,
        "password": this.password,
        "name": this.name,
        "companyName": this.companyName
      })
        .then((Response) => {
          this.Response = Response;
          this.commonUtilsService.showToast('Account Created Successfully', "toastSuccess");
          this.navCtrl.pop();
        }, (error) => {
          console.log("eeror is ", JSON.parse(error._body).error);
          this.commonUtilsService.showToast('Failed To Create Account, Error is ' + JSON.parse(error._body).error, "toastFailed");
        })
    }
  }

  showUserPage() {
    this.navCtrl.push(UsersPage);
  }

}
