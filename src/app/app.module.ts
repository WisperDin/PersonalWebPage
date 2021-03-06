import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {Header} from "./header/header";
import {PageMain} from "./page-main/main-page";
import {AppRoutingModule} from "./app-routing.module";

import { ModalModule } from 'ngx-bootstrap/modal'
import { AlertModule } from 'ngx-bootstrap/alert';

import {FormsModule} from '@angular/forms'

import {Login} from "./login/login";
import {AuthGuard} from "./auth-guard";
import {UserService} from "./_services/user.service";
import {HttpModule} from "@angular/http";
import {PageArticle} from "./page-article/page-article";
import {ArticleService} from "./_services/article.service";
import {PageMsgBoard} from "./page-msgboard/page-msgboard";
import {MsgService} from "./_services/msg.service";
import {AlertService} from "./_services/alert.service";
import {GlobalAlerts} from "./global-alerts/global-alerts";
import {PageLabPV} from "./page-lab-pvoper/page-lab-pv";

@NgModule({
  declarations: [
    AppComponent,
    PageMain,
    Header,
    Login,
    PageArticle,
    PageMsgBoard,
    GlobalAlerts,
    PageLabPV
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    AlertModule.forRoot()

  ],
  providers: [
    AuthGuard,
    UserService,
    ArticleService,
    MsgService,
    AlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
