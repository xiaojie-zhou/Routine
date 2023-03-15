import { Component, OnInit } from '@angular/core';
import {SleepService} from "../services/sleep.service";
import {OvernightSleepData} from "../data/overnight-sleep-data";
import {Router} from "@angular/router";
import {StanfordSleepinessData} from "../data/stanford-sleepiness-data";
import {NavController} from "@ionic/angular";


@Component({
  selector: 'app-log',
  templateUrl: './log.page.html',
  styleUrls: ['./log.page.scss'],
})
export class LogPage implements OnInit {
  overnightRes: { summary: string; dateInfo: string; }[] = [];
  constructor(private router: Router, public sleepService: SleepService, private navCtrl:NavController) { }

  ngOnInit() {
    this.sleepService.getOvernightFB();
    this.overnightRes = this.sleepService.overnightResult;
  }

  goBack() {
    this.navCtrl.back();
  }

  toHome() {
    this.router.navigate(['/home']);
  }
}

