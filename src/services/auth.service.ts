import {Injectable} from "@angular/core";
import {Response} from "@angular/http";

import {HttpUtils} from "./http-utils.service";

@Injectable()
export class AuthService {
  constructor(private httpUtils: HttpUtils) {

  }

  login(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpUtils.request({url: 'api/auth/login', method: 'POST'}, {}, {email: email, password: password})
        .subscribe((response: Response) => {
          resolve(response.json());
        }, (err) => {
          console.log('Login Failed');
          reject(err);
        });
    });
  }

  register(reqBody: object): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpUtils.request({url: 'api/auth/register', method: 'POST'}, {}, reqBody)
        .subscribe((response: Response) => {
          resolve(response.json());
        }, (err) => {
          reject(err);
        });
    });
  }
}
