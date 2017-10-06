import {Injectable, Inject} from "@angular/core";
import {Http, Response, RequestOptions, RequestOptionsArgs, URLSearchParams, Headers} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {LocalStorageServices} from "./localStorage.service";


@Injectable()
export class HttpUtils {
  private baseUrl: string = 'http://localhost:8585/';

  constructor(public http: Http, private localStorageServices: LocalStorageServices) {
  }

  request = (apiOptions: any, params?: any, body?: any): Observable<Response> => {
    const path = this.baseUrl + apiOptions.url;

    let headers = new Headers();
    headers.set('Content-Type', 'application/json');
    if (apiOptions.withToken) {
      headers.set('Authorization', 'Bearer ' + this.localStorageServices.getToken());
    }
    let urlParams = new URLSearchParams();
    if (params !== null && typeof params === 'object') {
      for (let key in params) {
        if (params.hasOwnProperty(key)) {
          urlParams.set(key, params[key]);
        }
      }
    }

    let requestOptions: RequestOptionsArgs = new RequestOptions({
      method: apiOptions.method,
      headers: headers,
      withCredentials: false,
      params: urlParams,
      body: body == null ? '' : JSON.stringify(body)
    });
    return this.http.request(path, requestOptions);
  }
}
