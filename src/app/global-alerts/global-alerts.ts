import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {AlertService} from "../_services/alert.service";

@Component({
  selector: 'global-alert',
  templateUrl: './global-alerts.html',
  styleUrls: ['./global-alerts.css']
})
export class GlobalAlerts {
  private subscription: Subscription;
  alerts:any[] = []

  constructor(private alertService: AlertService){
    this.subscription = alertService.getMessage().subscribe(message => {
      if(message){
        this.alerts.push(message);
      }
    });
  }

  ngOnDestroy(): void {
    // unsubscribe on destroy to prevent memory leaks
    this.subscription.unsubscribe();
  }


}
