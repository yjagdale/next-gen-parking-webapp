import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { UserService } from "../../services/user.service";
import { LocalStorageServices } from "../../services/localStorage.service";
import { HomePage } from "../home/home";
import { OnInit } from '@angular/core';


@Component({
  selector: 'page-users',
  templateUrl: 'users.html'
})
export class UsersPage implements OnInit {
  users: Array<any>;
  userDetails:object;
  constructor(public navCtrl: NavController, private userService: UserService, private localStorageServices:LocalStorageServices) {

  }

   ngOnInit(): void {
    this.localStorageServices.getItemFromLocalStorage('user')
    .then((value)=>{
      if(value && value.role !== "ADMIN"){
        this.navCtrl.setRoot(HomePage);
      }
    }, (err)=>{
      console.log(err);
    });

  }

  logout(){
    this.localStorageServices.removeItemToLocalStorage('userToken');
    this.localStorageServices.removeItemToLocalStorage('user');
    this.navCtrl.setRoot(HomePage);
  }

  ionViewDidEnter() {
    this.userService.getUsers()
    .then((users)=>{
      this.users = users;
    }, (error)=>{
      console.log('Lagli');
    })
  }

}
