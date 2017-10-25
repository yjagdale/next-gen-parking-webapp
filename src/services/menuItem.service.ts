import {Injectable} from "@angular/core";
import {ListPage} from "../pages/list/list";
import {UsersPage} from "../pages/users/users";
import {RegisterPage} from "../pages/register/register";


@Injectable()
export class MenuItemService {

  private menuList: any;
  private loggedIn: boolean = false;

  constructor() {
    this.menuList = [
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
}
