import { Component } from '@angular/core';

@Component({
  selector: 'article-page',
  templateUrl: './page-article.html',
  styleUrls: ['./page-article.css']
})
export class PageArticle {
  articles=[
    {date:"2017-1-9 15:45",title:"GO源码剖析",content:"golang 并没有使用系统提供的互斥锁,而是在用户空间给予原子操作实现,以便更好地支持并发调度。\n golang 原子操作使用的CAS实现(有关原子的概念,近期我会整理)。golang 标准库sync提供Mutex、RWMutex,使用起来并不复杂,但有几个地方需要注意:1. Mutex可以作为结构体的一部分2. Mutex创建后,以后对Mutex的操作不能复制Mutex,必须实现为pointer-receiver,否则会因复制的关系,导致锁机制失效"},
    {date:"2017-1-5 07:10",title:"Font Awesome",content:"After you get up and running, you can place Font Awesome icons just about anywhere with the i tag. Some examples appreciatively re-used from the Bootstrap documentation."}
  ]

  edited:boolean=false;

  editArticle(){
    this.edited=true
  }

  editArticleTheme:string;
  editArtcleContent:string;
  addArticle(){
    if(!this.editArticleTheme){
      return
    }
    if(!this.editArtcleContent){
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
  }

}
