import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AlertService {
  private subject = new Subject<any>();
  private keepAfterNavigationChange = false;
  constructor(private router: Router) {
    // clear alert message on route change
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterNavigationChange) {
          // only keep for a single location change
          this.keepAfterNavigationChange = false;
        } else {
          // clear alert
          this.subject.next();
        }
      }
    });
  }


  /**
   * 操作成功提示
   * @param message
   */
  success(message: string,timeout:number) {
      if(!message||!timeout){
        console.error('success param error')
        return
      }
      this.subject.next({
        type: 'success',
        msg: message,
        timeout: timeout
      });
  }

  /**
   * 操作info提示
   * @param message
   */
  info(message: string,timeout:number) {
    if(!message||!timeout){
      console.error('info param error')
      return
    }
    this.subject.next({
      type: 'info',
      msg: message,
      timeout: timeout
    });
  }

  /**
   * 操作异常提示
   * @param message
   */
  error(message: string,timeout:number) {
    if(!message||!timeout){
      console.error('error param error')
      return
    }
    this.subject.next({
      type: 'danger',
      msg: message,
      timeout: timeout
    });
  }

  /**
   * 操作警告提示
   * @param message
   */
  warn(message: string,timeout:number) {
    if(!message||!timeout){
      console.error('warn param error')
      return
    }
    this.subject.next({
      type: 'warning',
      msg: message,
      timeout: timeout
    });
  }
  /**
   * 获取操作信息
   */
  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }




}
