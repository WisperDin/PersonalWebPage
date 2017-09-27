import {Component, OnInit} from '@angular/core';
import utils from "../utils/utils";
import {ArticleService} from "../_services/article.service";
import {AlertService} from "../_services/alert.service";


@Component({
  selector: 'article-page',
  templateUrl: './page-article.html',
  styleUrls: ['./page-article.css',"../css/panel.css"]
})
export class PageArticle implements OnInit{

  constructor(
    private articleService:ArticleService,
    private alertService:AlertService
  ){

  }

  ngOnInit(){
    this.refreshArticles()
  }

  articles=[]

  //控制是否显示添加文章卡片
  hasLogin:boolean=false;

  refreshArticles(){
    let ob = this.articleService.getArticleList('DESC','createdat')
    if(!ob){
      //hasn't login
      //todo...反馈
      console.warn('refreshArticles ob null')
      this.hasLogin = false
      return
    }

    ob.subscribe(
      (fb)=>{
        if(!fb){
          console.error('getArticleList fb null')
          return
        }
        if(!fb.code){
          console.error('getArticleList fb.code null')
          return
        }
        //todo 反馈
        if(fb.code==2000){
          if(!fb.data){
            console.error('getArticleList fb.data null')
            return
          }
          for (let article of this.articles) {
            //检查一下
            if(!article.createdat){
              console.error('article.createdat null')
              continue
            }
            if(!article.theme){
              console.error('article.theme null')
              continue
            }
            if(!article.content){
              console.error('article.content null')
              continue
            }
            try{
              let tmp:Date = new Date(article.createdat);
              article.createdat = tmp.toString()
            }catch(e) {
              console.error('article.date to string failed'+e.status);

            }
          }
          this.articles = fb.data
          this.hasLogin = true

          return
        }
        this.alertService.error('加载文章失败',1000)
        alert('getArticleList Failed');
      }
    )
  }

  edited:boolean=false;

  editArticle(){
    this.edited=true
  }

  //弹出的错误反馈
  alerts: any = [];

  editArticleTheme:string;
  editArtcleContent:string;
  addArticle(){
    if(!this.editArticleTheme){
      utils.customAlert(this.alerts,'warning','Theme Should Be Not Empty.',1000);
      return
    }
    if(!this.editArtcleContent){
      utils.customAlert(this.alerts,'warning','Content Should Be Not Empty.',1000);
      return
    }

    //尝试提交文章
    let ob = this.articleService.saveArticle(this.editArticleTheme,this.editArtcleContent,'')
    if(!ob){
      console.error('ngOnInit saveArticle fail')
      return
    }

    ob.subscribe(
      (fb)=>{
        if(!fb){
          console.error('saveArticle fb null')
          utils.customAlert(this.alerts,'danger','Article Save Failed',5000);
          return
        }
        if(!fb.code){
          console.error('saveArticle fb.code null')
          utils.customAlert(this.alerts,'danger','Article Save Failed',5000);
          return
        }
        if(fb.code==2000){
          //刷新文章列表
          this.refreshArticles()

          //show plus button
          this.edited=false;
          return
        }
        utils.customAlert(this.alerts,'danger','Article Save Failed',5000);
      }
    )
  }

}
