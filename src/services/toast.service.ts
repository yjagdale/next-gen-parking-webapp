import { Injectable } from "@angular/core";

import { ToastController } from 'ionic-angular';



@Injectable()
export class ToastService {
    constructor(public toastCtrl: ToastController) {

    }


    showToast(textMsg) {
        const toast = this.toastCtrl.create({
            message: textMsg,
            duration: 3000,
            position: 'bottom'
        });

        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });
        toast.present();
    }

}
