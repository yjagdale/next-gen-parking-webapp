import {Injectable} from "@angular/core";
import {Response} from "@angular/http";
import {HttpUtils} from "./http-utils.service";



@Injectable()
export class UserService {
  constructor(private httpUtils: HttpUtils) {
  }

  getUsers(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpUtils.request({url: 'api/user', method: 'GET', withToken: true})
        .subscribe((response: Response) => {
          resolve(response.json());
        }, (err) => {
          console.log('get user failed');
          reject(err);
        });
    });
  }

  createUser(reqBody: object): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpUtils.request({url: 'api/user', method: 'POST', withToken: true}, {}, reqBody)
        .subscribe((response: Response) => {
          resolve(response.json());
        }, (err) => {
          console.log('get user failed');
          reject(err);
        });
    });
  }

  updateUser(reqBody: any, pathParam): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpUtils.request({url: 'api/user/' + pathParam, method: 'PUT', withToken: true}, {}, reqBody)
        .subscribe((response: Response) => {
          resolve(response.json());
        }, (err) => {
          console.log('get user failed');
          reject(err);
        });
    });
  }

  deleteUser(pathParam: string) {
    return new Promise((resolve, reject) => {
      this.httpUtils.request({url: 'api/user/' + pathParam, method: 'DELETE', withToken: true}, {}, {})
        .subscribe((response: Response) => {
          resolve(response.json());
        }, (err) => {
          reject(err);
        });
    });
  }


}
