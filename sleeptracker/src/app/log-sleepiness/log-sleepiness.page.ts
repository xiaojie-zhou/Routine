import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {SleepService} from "../services/sleep.service";
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-log-sleepiness',
  templateUrl: './log-sleepiness.page.html',
  styleUrls: ['./log-sleepiness.page.scss'],
})
export class LogSleepinessPage implements OnInit {
  sleepinessRes: { summary: string; dateInfo: string; }[] = [];
  constructor(private router: Router, public sleepService: SleepService, private navCtrl:NavController) { }

  ngOnInit() {
    this.sleepService.getSleepinessFB();
    this.sleepinessRes = this.sleepService.sleepinessResult;
  }

  goBack() {
    this.navCtrl.back();
  }

  toHome() {
    this.router.navigate(['/home']);
  }
}

