import {Component, OnInit} from '@angular/core';
import {ArticleService} from "../_services/article.service";
import {MsgService} from "../_services/msg.service";
import utils from "../utils/utils";
import {AlertService} from "../_services/alert.service";

@Component({
  selector: 'msgboard-page',
  templateUrl: './page-msgboard.html',
  styleUrls: ['./page-msgboard.css',"../css/panel.css"]
})
export class PageMsgBoard implements OnInit{

  //消息内容
  editMsgContent:string

  //弹出警告
  alerts:any[] = []

  constructor(
    private msgService:MsgService,
    private alertService:AlertService
  ){}

  ngOnInit(){

    this.refreshMsgs()
  }

  refreshMsgs(){
    let ob = this.msgService.getMsgList('DESC','createdat')
    if(!ob){
      console.error('ngOnInit getMsgList fail')
      return
    }

    ob.subscribe(
      (fb)=>{
        if(!fb){
          console.error('getMsgList fb null')
          return
        }
        if(!fb.code){
          console.error('getMsgList fb.code null')
          return
        }
        //todo 反馈
        if(fb.code==3000){
          if(!fb.data){
            console.error('getMsgList fb.data null')
            return
          }
          for (let msg of fb.data) {
            //检查一下
            if(!msg.createdat){
              console.error('msg.createdat null')
              continue
            }
            if(!msg.content){
              console.error('msg.content null')
              continue
            }
            try{
              let tmp:Date = new Date(msg.createdat);
              msg.createdat = tmp.toString()
            }catch(e) {
              console.error('msg.date to string failed'+e.status);
            }
          }
          this.messages = fb.data
          return
        }
        //3005表示无消息
        if(fb.code!=3005){
          this.alertService.error('加载留言板失败',1000)
        }
      }
    )
  }

  messages:any[] = [

  ]

  addMsg(){
    if(!this.editMsgContent){
      console.error('addMsg editMsgContent null')
      return
    }
    //尝试提交消息
    let ob = this.msgService.saveMsg(this.editMsgContent)
    if(!ob){
      console.error('addMsg saveMsg fail')
      return
    }

    ob.subscribe(
      (fb)=>{
        if(!fb){
          console.error('saveMsg fb null')
          utils.customAlert(this.alerts,'danger','Msg Save Failed',5000);
          return
        }
        if(!fb.code){
          console.error('saveArticle fb.code null')
          utils.customAlert(this.alerts,'danger','Msg Save Failed',5000);
          return
        }
        if(fb.code==3000){
          //刷新消息列表
          this.refreshMsgs()
          return
        }
        utils.customAlert(this.alerts,'danger','Msg Save Failed',5000);
      }
    )
  }

  clear(){
    this.editMsgContent = '';
  }

}
