import {Injectable} from "@angular/core";
import {Http,Headers} from "@angular/http";
import {ApiUrl} from "./api-url";
import utils from "../utils/utils";
import 'rxjs/add/operator/map'
import {UserService} from "./user.service";

@Injectable()
export class ArticleService {
  constructor(
    private http: Http
  ) { }



  getArticleList(){
    let user = JSON.parse(localStorage.getItem('user'))
    if(!user){
      console.error('GetUserInfo user null!')
      return null
    }
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.get(ApiUrl.getArticle +'?'+ utils.parseParam({
      username:user.username,
      userid:user.id
    }),{headers:headers,withCredentials: true})
      .map(resp=>resp.json())
  }

  saveArticle(theme,content,imgurl:string){
    let user = JSON.parse(localStorage.getItem('user'))
    if(!user){
      console.error('saveArticle user null!')
      return null
    }

    if(!theme){
      console.error('saveArticle theme null!')
      return null
    }
    if(!content){
      console.error('saveArticle content null!')
      return null
    }

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(ApiUrl.saveArticle,utils.parseParam({
      username:user['username'],
      userid:user['id'],
      theme:theme,
      content:content,
      imgurl:imgurl,
    }),{headers:headers,withCredentials: true})
      .map(resp=>resp.json())
  }

}
