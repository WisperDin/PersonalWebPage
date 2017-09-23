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
          this.articles = fb.data
          return
        }
        alert('getArticleList Failed');
      }
    )
  }

  articles=[
    {date:"2017-1-9 15:45",title:"GO源码剖析",content:"golang 并没有使用系统提供的互斥锁,而是在用户空间给予原子操作实现,以便更好地支持并发调度。\n golang 原子操作使用的CAS实现(有关原子的概念,近期我会整理)。golang 标准库sync提供Mutex、RWMutex,使用起来并不复杂,但有几个地方需要注意:1. Mutex可以作为结构体的一部分2. Mutex创建后,以后对Mutex的操作不能复制Mutex,必须实现为pointer-receiver,否则会因复制的关系,导致锁机制失效"},
    {date:"2017-1-5 07:10",title:"Font Awesome",content:"After you get up and running, you can place Font Awesome icons just about anywhere with the i tag. Some examples appreciatively re-used from the Bootstrap documentation."}
  ]

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
    this.articles.unshift(
      {
        date:Date.now().toString(),
        title:this.editArticleTheme,
        content:this.editArtcleContent,
      },
    )

    //show plus button
    this.edited=false;

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
          return
        }
        alert('saveArticle Failed');
      }
    )
  }

}
