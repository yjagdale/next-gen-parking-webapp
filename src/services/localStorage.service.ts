import {Injectable} from "@angular/core";

import {Storage} from '@ionic/storage';


@Injectable()
export class LocalStorageServices {
  private token: string;

  constructor(private storage: Storage) {

  }

  addItemToLocalStorage(key, data) {
    this.storage.set(key, data);
  }

  getItemFromLocalStorage(key) {
    return this.storage.get(key);
  }

  removeItemToLocalStorage(key) {
    this.storage.remove(key);
  }

  setToken(token) {
    this.token = token;
  }
  getToken(){
    return this.token;
  }

}
