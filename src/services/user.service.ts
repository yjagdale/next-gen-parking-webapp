import { Injectable } from "@angular/core";
import { Response } from "@angular/http";

import { HttpUtils } from "./http-utils.service";
import { LocalStorageServices } from "./localStorage.service";


@Injectable()
export class UserService {
    constructor(private httpUtils: HttpUtils, private localStorageServices:LocalStorageServices) {

    }

    getUsers(): Promise<any> {
        return new Promise((resolve, reject)=>{
               this.httpUtils.request({url: 'api/user', method: 'GET', withToken:true})
                .subscribe((response: Response)=>{
                      resolve(response.json());
                }, (err)=> {
                    console.log('get user failed');
                    reject(err);
                });
            });
        }

}
