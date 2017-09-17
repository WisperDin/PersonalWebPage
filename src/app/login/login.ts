import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import {UserService} from "../_services/user.service";

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

  alerts: any = [];

  failAlert(): void {
    this.alerts.push({
      type: 'danger',
      msg: `Sign In Failed`,
      timeout: 500
    });
  }

  login(){
    if(!this.username){
      console.error('login username null')
      return
    }
    if(!this.password){
      console.error('login password null')
      return
    }
    this.userService.login(this.username,this.password).subscribe(
      fb=>{
        //todo 反馈
        if(fb.code==1000){
          //登录成功
          this.hideModal();
          return
        }
        this.failAlert()
      }
    )

  }
}
