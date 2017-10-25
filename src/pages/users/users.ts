import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {UserService} from "../../services/user.service";
import {LocalStorageServices} from "../../services/localStorage.service";
import {HomePage} from "../home/home";
import {OnInit} from '@angular/core';
import {AlertController} from 'ionic-angular';
import {NewUser} from "../newUser/newUser";
import {CommonUtilsService} from "../../services/commonUtils.service";
import * as _ from "lodash";


@Component({
  selector: 'page-users',
  templateUrl: 'users.html'
})
export class UsersPage implements OnInit{
  users: Array<any>;
  public userDetails: any;
  isAdminUser: boolean;

  constructor(public navCtrl: NavController, private userService: UserService, private localStorageServices: LocalStorageServices, public alertCtrl: AlertController, private commonUtilsService: CommonUtilsService) {
    let status = this.localStorageServices.isUserLoggedIn();
    if(status) {
      if (this.userDetails) {
        this.getFiltredUser();
      } else {
        this.localStorageServices.getItemFromLocalStorage('user')
          .then((value) => {
            this.userDetails = value;
            if (this.userDetails && this.userDetails.role !== "ADMIN") {
              this.navCtrl.setRoot(HomePage);
              this.isAdminUser = this.userDetails.role === "ADMIN";
            } else {
              this.getFiltredUser();
            }
          }, (err) => {
            console.log(err);
          });
      }
    }else {
      navCtrl.setRoot(HomePage);
    }
  }

  ngOnInit() {
    if (this.userDetails) {
      this.getFiltredUser();
    }
  }

  logout() {
    let confirm = this.alertCtrl.create({
      title: 'you want to logout?',
      message: 'Do you want to logout from application??',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            this.localStorageServices.removeItemToLocalStorage('userToken');
            this.localStorageServices.removeItemToLocalStorage('user');
            this.commonUtilsService.showToast("Logged out successfully", 'toastSuccess')
            this.navCtrl.setRoot(HomePage);
          }
        }
      ]
    });
    confirm.present();
  }

  getFiltredUser() {
    this.getUsers().then((Response) => {
      this.localStorageServices.getItemFromLocalStorage('user')
        .then((value) => {
          let currUser = _.findIndex(this.users, function (user) {
            return user._id === value._id;
          });
          if (currUser > -1) {
            this.users.splice(currUser, 1);
          }
        }, () => {
          console.log('reject Function');
        });
    });
  }

  getUsers() {
    return new Promise((resolve, reject) => {
      this.userService.getUsers()
        .then((users) => {
          this.users = users;
          resolve(this.users);
        }, (error) => {
          console.log('Lagli');
          reject(error);
        })
    })
  }

  newUser() {
    this.navCtrl.push(NewUser);
  }

  openUserDetails(user) {
    this.navCtrl.push(NewUser, {user: user});
  }

  deleteUser(userEmail: string) {
    this.userService.deleteUser(userEmail).then((value) => {
      this.commonUtilsService.showToast('User Deleted Successfully', "toastSuccess");
      this.getFiltredUser();
    }, (err) => {
      console.log(err);
    });
  }

}
