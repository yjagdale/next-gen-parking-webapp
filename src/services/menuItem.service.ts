import {Injectable} from "@angular/core";
import {HomePage} from "../pages/home/home";
import {ListPage} from "../pages/list/list";
import {UsersPage} from "../pages/users/users";
import {RegisterPage} from "../pages/register/register";
import * as _ from "lodash";


@Injectable()
export class MenuItemService {

  private menuList: any;
  private loggedIn: boolean = false;

  constructor() {
    this.menuList = [
      {title: 'Login', component: HomePage},
      {title: 'List', component: ListPage},
      {title: 'Users', component: UsersPage},
      {title: 'Register', component: RegisterPage},
    ];
  }

  updateMenuList(menuList) {
    this.menuList = menuList;
  }

  getMenuList() {
    return this.menuList;
  }

  setLoggedIn(loginStatus) {
    this.loggedIn = loginStatus;
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  removeItem(currModule) {
    let currUser = _.findIndex(this.menuList, function (module) {
      return module.title === currModule.title
    });
    if (currUser > -1) {
      this.menuList.splice(currUser, 1);
    }
  }
}
