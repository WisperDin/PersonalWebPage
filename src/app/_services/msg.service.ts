import {Injectable} from "@angular/core";
import {Http,Headers} from "@angular/http";
import {ApiUrl} from "./api-url";
import utils from "../utils/utils";
import 'rxjs/add/operator/map'
import {UserService} from "./user.service";

@Injectable()
export class MsgService {
  constructor(
    private http: Http
  ) { }



  getMsgList(orderType?:string,orderProp?:string){
    let user = JSON.parse(localStorage.getItem('user'))
    if(!user){
      console.error('GetUserInfo user null!')
      return null
    }
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.get(ApiUrl.getMsg +'?'+ utils.parseParam({
        username:user.username,
        userid:user.id,
        orderProp:orderProp,
        orderType:orderType
      }),{headers:headers,withCredentials: true})
      .map(resp=>resp.json())
  }

  saveMsg(content:string){
    let user = JSON.parse(localStorage.getItem('user'))
    if(!user){
      console.error('saveMsg user null!')
      return null
    }

    if(!content){
      console.error('saveMsg content null!')
      return null
    }

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(ApiUrl.saveMsg,utils.parseParam({
      username:user['username'],
      userid:user['id'],
      content:content,
    }),{headers:headers,withCredentials: true})
      .map(resp=>resp.json())
  }

}
