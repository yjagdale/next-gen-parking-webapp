import {Injectable} from "@angular/core";
import {Response} from "@angular/http";

import {HttpUtils} from "./http-utils.service";
import {LocalStorageServices} from "./localStorage.service";
import {UserService} from "./user.service"
@Injectable()
export class AuthService {
  typeStatus:Boolean = false;
  constructor(private httpUtils: HttpUtils, private localStorageServices: LocalStorageServices, private userService:UserService) {
      
  }

  login(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
    console.log(this.typeStatus);
    if(!this.typeStatus){
      this.httpUtils.request({url: 'api/auth/login', method: 'POST'}, {}, {email: email, password: password})
      .subscribe((response: Response) => {
        console.log(response.json());
        resolve(response.json());
      }, (err) => {
        console.log('Login Failed');
        reject(err);
      });
    } else {
      resolve(
        {
          token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWU3NDVmMmIyNDYzMDBkMDA2MjQ1YmIiLCJlbWFpbCI6InlAbS5jb20iLCJyb2xlIjoiQURNSU4iLCJjb21wYW55SWQiOiI1OWU3NDVmMWIyNDYzMDBkMDA2MjQ1YmEiLCJpYXQiOjE1MDg5OTk4NTQsImV4cCI6MTUwOTAwMzQ1NH0.mMEZgn3kigXscdpZ7GmsVHwefFZtx8U8ZV0Tcb3250Q",
          user: {
            companyId: "59e745f1b246300d006245ba",
            email: "y@m.com",
            role:"ADMIN",
            _id:"59e745f2b246300d006245bb"
          }
    })
    }
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
  setStatus(status){
  this.typeStatus = status;
  this.userService.setStatus(this.typeStatus);
  }
}
