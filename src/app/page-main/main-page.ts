import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'main-page',
  templateUrl: './main-page.html',
  styleUrls: ['./main-page.css',"../css/panel.css"]
})
export class PageMain {
  constructor(private router:Router){}

  clickArticle(){
    this.router.navigate(['/page/article'])
  }
}
