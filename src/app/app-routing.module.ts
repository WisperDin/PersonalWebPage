import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import {PageMain} from "./page-main/main-page";
import {Login} from "./login/login";
import {AuthGuard} from "./auth-guard";
import {PageArticle} from "./page-article/page-article";
import {PageMsgBoard} from "./page-msgboard/page-msgboard";
import {PageLabPV} from "./page-lab-pvoper/page-lab-pv";


const appRoutes: Routes = [
  { path: 'page', children:[
    { path: 'article', component: PageArticle},
    { path: 'home', component: PageMain , canActivate: [AuthGuard],},
    { path: 'login', component: Login},
    { path: 'msgboard', component: PageMsgBoard},
    { path: 'lab', component: PageLabPV}
  ]},

  //{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
