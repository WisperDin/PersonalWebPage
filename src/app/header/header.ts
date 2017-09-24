import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'header',
    templateUrl: './header.html',
    styleUrls: ['./header.css']
})
export class Header {
    constructor(private router:Router){

    }

    tabNum:number = 4
    jumpUrl:any[] = [
      {url:'/page/home'},
      {url:''},
      {url:''},
      {url:'/page/msgboard'},
    ]

    tabflag:number=0
    clickTab(tab:number){
        if(tab==undefined){
          console.error('clickTab tab null')
          return
        }
        if(tab<0||tab>this.tabNum-1){
          console.error('clickTab tab null')
          return
        }

        this.tabflag=tab
        this.router.navigate([this.jumpUrl[tab].url])
    }
}
