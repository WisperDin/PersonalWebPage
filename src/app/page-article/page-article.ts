import {Component, OnInit} from '@angular/core';
import utils from "../utils/utils";
import {ArticleService} from "../_services/article.service";


@Component({
  selector: 'article-page',
  templateUrl: './page-article.html',
  styleUrls: ['./page-article.css']
})
export class PageArticle implements OnInit{

  constructor(private articleService:ArticleService){

  }

  ngOnInit(){
    this.refreshArticles()
  }

  articles=[]

  refreshArticles(){
    let ob = this.articleService.getArticleList()
    if(!ob){
      console.error('ngOnInit getArticleList fail')
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

          return
        }
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
          return
        }
        if(!fb.code){
          console.error('saveArticle fb.code null')
          return
        }
        //todo 反馈
        if(fb.code==2000){
          //刷新文章列表
          this.refreshArticles()

          //show plus button
          this.edited=false;
          return
        }
        alert('saveArticle Failed');
      }
    )
  }

}
