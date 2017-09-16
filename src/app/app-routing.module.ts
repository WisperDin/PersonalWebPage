import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import {PageMain} from "./page-main/main-page";
import {Login} from "./login/login";
import {AuthGuard} from "./auth-guard";


const appRoutes: Routes = [
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: PageMain , canActivate: [AuthGuard],},
  { path: 'login', component: Login},
  //{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
