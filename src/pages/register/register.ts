import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastService } from '../../services/toast.service';

import { UsersPage } from "../users/users";
import { AuthService } from "../../services/auth.service";
import { LocalStorageServices } from "../../services/localStorage.service";
import { OnInit } from '@angular/core';
import {HomePage} from "../home/home";


@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage implements OnInit {
  email:string;
  password:string;
  registerStatus:boolean;
  Response:object;
  companyName:string;
  name:string;
  registerError:any;

  constructor(public navCtrl: NavController, private authService:AuthService, public toastCtrl: ToastService) {

  }

  ngOnInit(): void {
    this.registerStatus = true;
  }

  register(){
    this.registerStatus = true;
    this.authService.register({
      "email":this.email,
        "password":this.password,
        "name":this.name,
        "companyName":this.companyName
    })
    .then((Response)=>{
      this.Response = Response;
      this.registerStatus = true;
      this.toastCtrl.showToast('Account created successfully');
      this.navCtrl.pop();
    }, (error)=>{
      this.registerStatus = false;
      this.registerError = JSON.parse(error._body).error;
      console.log("eeror is ", this.registerError.error);
      this.toastCtrl.showToast('Failed to create account');      
    })
  }

  showUserPage(){
    this.navCtrl.push(UsersPage);
  }

}
