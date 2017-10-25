import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserService } from "../../services/user.service";

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  selectedItemBody:string;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserService) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    if(this.selectedItem)
      this.selectedItemBody = this.selectedItem.name + this.selectedItem.email + this.selectedItem.role + this.selectedItem.status + this.selectedItem.companyId;
    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.userService.getUsers()
        .then((users) => {
          this.items = users;
        }, (error) => {
          console.log('Lagli');
        })
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListPage, {
      item: item
    });
  }
}
