import { Component } from '@angular/core';

@Component({
    selector: 'header',
    templateUrl: './header.html',
    styleUrls: ['./header.css']
})
export class Header {
    tabflag:number=0
    clickTab(tab:number){
        this.tabflag=tab
    }
}
