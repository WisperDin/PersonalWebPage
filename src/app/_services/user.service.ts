import {Injectable} from "@angular/core";
import {Http,Headers} from "@angular/http";
import {ApiUrl} from "./api-url";
import utils from "../utils/utils";
import 'rxjs/add/operator/map'

@Injectable()
export class UserService {
  constructor(
    private http: Http
  ) { }


  login(username,password:string){
    if(!username||!password){
      console.error('UserService login param null ')
      return
    }
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(ApiUrl.login,utils.parseParam({
      username:username,
      pwd:password
    }),{headers})
      .map(resp=>resp.json())
  }

}
