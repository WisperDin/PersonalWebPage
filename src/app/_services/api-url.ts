import {environment} from "../../environments/environment";
/**
 * Created by ASUS on 2017/9/16.
 */
export const ApiUrl = {
  login:environment.serveIp+'/api/login',
  getArticle:environment.serveIp+'/api/article',
  saveArticle:environment.serveIp+'/api/insert/article'
}
