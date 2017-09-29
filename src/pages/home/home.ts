import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { UsersPage } from "../users/users";
import { AuthService } from "../../services/auth.service";
import { LocalStorageServices } from "../../services/localStorage.service";
import { OnInit } from '@angular/core';
import {RegisterPage} from "../register/register";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  email:string;
  password:string;
  loginStatus:boolean;

  constructor(public navCtrl: NavController, private authService:AuthService, private localStorageServices:LocalStorageServices) {

  }

  ngOnInit(): void {
    this.loginStatus = true;
  }

  login(){
    this.authService.login(this.email, this.password)
    .then((Response)=>{
      this.loginStatus = true;
      this.localStorageServices.addItemToLocalStorage('userToken', Response.token);
      this.localStorageServices.setToken(Response.token);
      this.localStorageServices.addItemToLocalStorage('user', Response.user);
      this.navCtrl.setRoot(UsersPage);
    }, (error)=>{
      console.log('Lagli');
      this.loginStatus = false;
    })
  }

  register(){
    this.navCtrl.push(RegisterPage);
  }

  showUserPage(){
    this.navCtrl.push(UsersPage);
  }

}
