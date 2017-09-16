import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
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
    return this.http.post(ApiUrl.login,utils.parseParam({
      username:username,
      pwd:password
    }))
      .map(resp=>resp.json())
  }

}
