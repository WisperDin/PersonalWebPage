import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {Header} from "./header/header";
import {PageMain} from "./page-main/main-page";
import {AppRoutingModule} from "./app-routing.module";

import { ModalModule } from 'ngx-bootstrap/modal'
import {FormsModule} from '@angular/forms'

import {Login} from "./login/login";
import {AuthGuard} from "./auth-guard";
import {UserService} from "./_services/user.service";

@NgModule({
  declarations: [
    AppComponent,
    PageMain,
    Header,
    Login
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ModalModule.forRoot(),

  ],
  providers: [
    AuthGuard,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
