import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import {UserService} from "../_services/user.service";
import utils from "../utils/utils";

@Component({
  selector: 'demo-modal-auto-shown',
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  @ViewChild('autoShownModal') public autoShownModal:ModalDirective;
  public isModalShown:boolean = true;

  public hideModal():void {
    this.autoShownModal.hide();
  }

  public onHidden():void {
    this.isModalShown = false;
  }

  username:string;
  password:string;

  loginFailed:boolean = false

  constructor(
    private userService:UserService
  ){

  }
  //弹出的错误反馈
  alerts: any = [];


  login(){
    if(!this.username){
      console.error('login username null')
      return
    }
    if(!this.password){
      console.error('login password null')
      return
    }

    let ob = this.userService.login(this.username,this.password)
    if(ob==null){
      console.error('userService login fail')
      return
    }

    ob.subscribe(
      fb=>{
        if(!fb){
          console.error('login fb null')
          return
        }
        if(!fb.code){
          console.error('login fb.code null')
          return
        }

        //todo 反馈
        if(fb.code==1000){
          if(!fb.data){
            console.error('login fb.data null')
            return
          }
          //登录成功
          localStorage.setItem("user",JSON.stringify(fb.data))
          this.hideModal();
          return
        }
        utils.customAlert(this.alerts,'danger','Sign In Failed');
      }
    )

  }
}
