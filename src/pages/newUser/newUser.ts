import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import {UsersPage} from "../users/users";
import {UserService} from "../../services/user.service";
import {CommonUtilsService} from "../../services/commonUtils.service";
import {LocalStorageServices} from "../../services/localStorage.service";
import {HomePage} from "../home/home";

@Component({
  selector: 'page-new-user',
  templateUrl: 'newUser.html'
})
export class NewUser {
  userEmail: string;
  Response: object;
  userName: string;
  role: string;
  mode: string = '';
  currUser: any = {};

  constructor(public navCtrl: NavController, private navParams: NavParams, private userService: UserService, private commonUtilsService: CommonUtilsService, private localStorageServices: LocalStorageServices) {
    let status = this.localStorageServices.isUserLoggedIn();
    if(status) {
      if (this.navParams.get("user")) {
        this.currUser = this.navParams.get("user");
        this.userEmail = this.currUser.email;
        this.userName = this.currUser.name;
        this.role = this.currUser.role;
        this.mode = 'EDIT';
      }
    } else {
        this.navCtrl.setRoot(HomePage);
    }
  }

  createUser() {
    this.userService.createUser({
      "email": this.userEmail,
      "name": this.userName,
      "role": this.role
    })
      .then((Response) => {
        this.Response = Response;
        this.commonUtilsService.showToast("User Created Successfully", "toastSuccess");
        this.navCtrl.setRoot(UsersPage);
      }, (error) => {
        console.log("eeror is ", JSON.parse(error._body).error);
        this.commonUtilsService.showToast("User Creation Failed", "toastFailed");
      })
  }

  updateUser() {
    this.userService.updateUser({
      "name": this.userName,
      "role": this.role
    }, this.userEmail)
      .then((Response) => {
        this.Response = Response;
        this.commonUtilsService.showToast("User Updated Successfully", "toastSuccess");
        this.navCtrl.pop();
      }, (error) => {
        console.log("eeror is ", JSON.parse(error._body).error);
        this.commonUtilsService.showToast("User Updation Failed", "toastFailed");
      })
  }

  createOrUpdateUser() {
    switch (this.mode) {
      case 'EDIT':
        this.updateUser();
        break;
      case 'POST':
      default:
        this.createUser();
        break;

    }
  }

  showUserPage() {
    this.navCtrl.push(UsersPage);
  }

}
