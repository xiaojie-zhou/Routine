import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {SleepService} from "../services/sleep.service";
import {OvernightSleepData} from "../data/overnight-sleep-data";

@Component({
  selector: 'app-ave',
  templateUrl: './ave.page.html',
  styleUrls: ['./ave.page.scss'],
})
export class AvePage implements OnInit {
/*
  hlist: Array<number> = [];
  mlist: Array<number> = [];
  suggestSleepH: any;
  suggestSleepM: any;
  score: any;
  currH: number = 1;
  currM: number = 30;
  targetSleepH = parseInt(this.sleepService.targetSleep.split(":")[0]);
  targetSleepM = parseInt(this.sleepService.targetSleep.split(":")[1]);

 */

  constructor(private router: Router, private sleepService: SleepService) { }

  ngOnInit() {
    /*
    this.logOvernight();
    this.suggest();
    console.log("here:");
    console.log(this.sleepService.AllOvernightData);
    console.log(this.hlist);
    console.log(this.suggestSleepH);
    console.log(this.suggestSleepM);

     */
  }
/*
  logOvernight(){

    this.sleepService.onlylogOvernightData(new OvernightSleepData(new Date('March 14, 2023 01:03:00'), new Date('March 15, 2023 12:36:00')));
    this.sleepService.onlylogOvernightData(new OvernightSleepData(new Date('March 15, 2023 23:59:00'), new Date('March 16, 2023 09:25:00')));
    this.sleepService.onlylogOvernightData(new OvernightSleepData(new Date('March 16, 2023 21:01:00'), new Date('March 17, 2023 08:06:00')));
    this.sleepService.onlylogOvernightData(new OvernightSleepData(new Date('March 17, 2023 22:30:00'), new Date('March 18, 2023 10:30:00')));
    this.sleepService.onlylogOvernightData(new OvernightSleepData(new Date('March 18, 2023 03:15:00'), new Date('March 19, 2023 13:15:00')));
    this.sleepService.onlylogOvernightData(new OvernightSleepData(new Date('March 19, 2023 20:47:00'), new Date('March 20, 2023 06:00:00')));
    this.sleepService.onlylogOvernightData(new OvernightSleepData(new Date('March 20, 2023 23:11:00'), new Date('March 21, 2023 08:30:00')));

  }

  suggest() {
    this.sleepService.AllOvernightData.forEach(item => {
        this.hlist.push(item.sleepStart.getHours());
        this.mlist.push(item.sleepStart.getMinutes());
      }
    )
    if (this.hlist.length < 7) {
      this.suggestSleepH = this.targetSleepH;
      this.suggestSleepM = this.targetSleepM;
    } else {
      this.cal();
      this.score = this.suggestSleepH
    }
  }

  cal() {
    let target = this.targetSleepH * 60 + this.targetSleepM;
    if (target >= 60 * 12) {
      target = target - 60 * 24;
    }
    let total = 0;
    let temp = 0;
    for (let i = 0; i < this.hlist.length; i++) {
      let totalMin = this.hlist[i] * 60 + this.mlist[i];
      if (totalMin < 60 * 12) {
        temp = totalMin;
      } else {
        temp = totalMin - 60 * 24;
      }
      total += temp;
    }
    let ave = total / 14 +  target / 2;
    if (ave > 0) {
      this.suggestSleepH = (ave - ave % 60) / 60;
      this.suggestSleepM = Math.round(ave % 60);
      if (this.targetSleepM === 60) {
        this.suggestSleepM = 59;
      }
    } else {
      let temp1 = 24 * 60 + ave;
      this.suggestSleepH = (temp1 - temp1 % 60) / 60;
      this.suggestSleepM = Math.round(temp1 % 60);
      if (this.targetSleepM === 60) {
        this.suggestSleepM = 59;
      }
    }
  }

  toHome() {
    this.router.navigate(['/home']);
  }


 */
}
