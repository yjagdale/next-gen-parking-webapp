import {Injectable} from "@angular/core";
import {Response} from "@angular/http";
import {HttpUtils} from "./http-utils.service";



@Injectable()
export class UserService {
  typeStatus:boolean = false;
  mockUserList:any = [{
    companyId:"59e745f1b246300d006245ba",
    createdAt:"2017-10-18T12:15:46.465Z",
    email:"y@m.com",
    name:"Yash",
    role:"ADMIN",
  status:"ACTIVE",
  updatedAt:"2017-10-18T12:15:46.465Z",
  _id:"59e745f2b246300d006245bb55"
}];
  constructor(private httpUtils: HttpUtils) {
  }

  getUsers(): Promise<any> {
    return new Promise((resolve, reject) => {
      if(!this.typeStatus){
      this.httpUtils.request({url: 'api/user', method: 'GET', withToken: true})
        .subscribe((response: Response) => {
 resolve(response.json());
        }, (err) => {
          console.log('get user failed');
          reject(err);
        });
      } else {
        resolve(this.mockUserList);
    }
    });
  }

  createUser(reqBody: object): Promise<any> {
    return new Promise((resolve, reject) => {
      if(!this.typeStatus){
      this.httpUtils.request({url: 'api/user', method: 'POST', withToken: true}, {}, reqBody)
        .subscribe((response: Response) => {
          resolve(response.json());
        }, (err) => {
          console.log('get user failed');
          reject(err);
        });
      } else {
        this.mockUserList.push({
          companyId:"59e745f1b246300d006245ba",
          createdAt:"2017-10-18T12:15:46.465Z",
          email:reqBody["email"],
          name:reqBody["name"],
          role:reqBody["role"],
          status:"ACTIVE",
          updatedAt:"2017-10-18T12:15:46.465Z",
          _id:"59e745f2b246300d006245bb55"
        });
        resolve(this.mockUserList);
      }
    });
  }

  updateUser(reqBody: any, pathParam): Promise<any> {
    return new Promise((resolve, reject) => {
      if(!this.typeStatus){
      this.httpUtils.request({url: 'api/user/' + pathParam, method: 'PUT', withToken: true}, {}, reqBody)
        .subscribe((response: Response) => {
          resolve(response.json());
        }, (err) => {
          console.log('get user failed');
          reject(err);
        });
      } else {
        resolve(this.mockUserList);
      }
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

  setStatus(status){
    this.typeStatus = status;
    }
}
