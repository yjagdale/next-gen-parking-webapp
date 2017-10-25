import {Injectable} from "@angular/core";

import {ToastController} from 'ionic-angular';

@Injectable()
export class CommonUtilsService {
  constructor(public toastCtrl: ToastController) {

  }

  showToast(toastMessage: string, toastType: string) {
    const toast = this.toastCtrl.create({
      message: toastMessage,
      duration: 3000,
      position: 'bottom',
      cssClass: toastType
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}
