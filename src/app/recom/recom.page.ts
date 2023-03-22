import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {SleepService} from "../services/sleep.service";
import {NavController} from "@ionic/angular";
import {StepPage} from "../step/step.page";
import {OvernightSleepData} from "../data/overnight-sleep-data";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Geolocation} from "@capacitor/geolocation";

const baseURL = "https://api.tomorrow.io/v4/"
const apiKey = 'ASFxW5G8TkzGvl6lotF1pXbkcLi4GSd6';

@Component({
  selector: 'app-recom',
  templateUrl: './recom.page.html',
  styleUrls: ['./recom.page.scss'],
})
export class RecomPage implements OnInit {

  // Step
  targetStep: number = 0;
  realStep: number = 0;

  // Sleep
  targetSleepH: number = 0;
  targetSleepM: number = 0;
  hlist: Array<number> = [];
  mlist: Array<number> = [];
  suggestSleepH: any;
  suggestSleepM: any;
  score: number = 0;
  currH: number = this.sleepService.currH;
  currM: number = this.sleepService.currM;

  // API
  coords: string = ""
  temper: number = 0;
  humi: number = 0;
  wind: number = 0;
  apiSug: string = "";
  time:Date = new Date();


  constructor(private router: Router, public sleepService: SleepService, private navCtrl:NavController, public userInfo: StepPage, public httpClient: HttpClient) { }

  ngOnInit() {
    //Step
    this.getStep();
    console.log(this.targetStep, this.realStep);

    //Sleep
    this.getSleep();
    console.log(this.targetSleepH, this.targetSleepM);
    this.addDefaultOvernight();
    console.log(this.sleepService.AllOvernightData.length);
    this.suggestSleep();
    console.log(this.hlist.length);
    console.log(this.suggestSleepH, this.suggestSleepM)
    if (this.currH !== 0 || this.currM != 0) {
      console.log(this.currH, this.currM);
      this.delay_score();
      console.log(this.score);
    }
  }

  //Step
  getStep(){
    if (this.sleepService.StepData.length !== 0) {
      let item = this.sleepService.StepData[this.sleepService.StepData.length - 1];
      this.targetStep = item.targetStep;
      this.realStep = item.realStep;
    }
  }

  //Sleep
  getSleep(){
    if (this.sleepService.targetSleepList.length !== 0) {
      let item = this.sleepService.targetSleepList[this.sleepService.targetSleepList.length - 1];
      this.targetSleepH = item.tarH;
      this.targetSleepM = item.tarM;
    }
  }

  addDefaultOvernight() {
    if (this.sleepService.AllOvernightData.length === 0) {
      this.sleepService.onlylogOvernightData(new OvernightSleepData(new Date('March 10, 2023 19:57:00'), new Date('March 11, 2023 04:06:00')));
      this.sleepService.onlylogOvernightData(new OvernightSleepData(new Date('March 11, 2023 02:56:00'), new Date('March 12, 2023 14:01:00')));
      this.sleepService.onlylogOvernightData(new OvernightSleepData(new Date('March 12, 2023 22:57:00'), new Date('March 13, 2023 09:45:00')));
      this.sleepService.onlylogOvernightData(new OvernightSleepData(new Date('March 13, 2023 23:28:00'), new Date('March 14, 2023 09:04:00')));
      this.sleepService.onlylogOvernightData(new OvernightSleepData(new Date('March 14, 2023 01:03:00'), new Date('March 15, 2023 12:36:00')));
      this.sleepService.onlylogOvernightData(new OvernightSleepData(new Date('March 15, 2023 23:59:00'), new Date('March 16, 2023 09:25:00')));
      this.sleepService.onlylogOvernightData(new OvernightSleepData(new Date('March 16, 2023 21:01:00'), new Date('March 17, 2023 08:06:00')));
      this.sleepService.onlylogOvernightData(new OvernightSleepData(new Date('March 17, 2023 22:30:00'), new Date('March 18, 2023 10:30:00')));
      this.sleepService.onlylogOvernightData(new OvernightSleepData(new Date('March 18, 2023 03:15:00'), new Date('March 19, 2023 13:15:00')));
      this.sleepService.onlylogOvernightData(new OvernightSleepData(new Date('March 19, 2023 20:47:00'), new Date('March 20, 2023 06:00:00')));
      this.sleepService.onlylogOvernightData(new OvernightSleepData(new Date('March 20, 2023 23:11:00'), new Date('March 21, 2023 08:30:00')));
    }
  }

  suggestSleep() {
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
    }
  }

  cal() {
    let target = this.targetSleepH * 60 + this.targetSleepM;
    if (target >= 60 * 12) {
      target = target - 60 * 24;
    }
    let total = 0;
    let temp = 0;
    for (let i = this.hlist.length - 8; i < this.hlist.length - 2; i++) {
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

  delay_score() {
    let St = this.currH * 60 + this.currM;
    let Sg = this.suggestSleepH * 60 + this.suggestSleepM;
    if (St > Sg) {
      let temp = St - Sg;
      this.score = Math.round(100 - temp);
    } else if (Sg - St > 12 * 60) {
      let temp = Sg - St + 60 * 24;
      this.score = Math.round(100 - temp);
    } else {
      let temp = 0;
      this.score = Math.round(100 - temp);
    }
  }

  //API
  async locateCoords() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.coords = coordinates.coords['latitude'].toString() + "," + coordinates.coords['longitude'].toString();
    console.log(this.coords, typeof(this.coords));
  }

  loadAPI(): Promise<any>{
    let response = this.httpClient.get(`${baseURL}timelines?location=${this.coords}&fields=temperature&fields=humidity&fields=windSpeed&timesteps=current&units=metric&apikey=${apiKey}`).toPromise();
    return Promise.resolve(response);
  }

  getAPI() {
    return this.loadAPI().then((data) => {
      this.temper = data["data"]["timelines"][0]["intervals"][0]["values"]["temperature"];
      console.log(this.temper);
      this.humi = data["data"]["timelines"][0]["intervals"][0]["values"]["humidity"];
      console.log(this.humi);
      this.wind = data["data"]["timelines"][0]["intervals"][0]["values"]["windSpeed"];
      console.log(this.wind);
      this.weather();
    })
  }

  weather() {
    if (this.humi >= 60) {
      this.apiSug += "It is rainy, which is not suitable for outdoor activities. Please work out inside!";
    } else if (this.wind >= 15) {
      this.apiSug += "It is windy, which is not suitable for outdoor activities. Please work out inside";
    } else {
      this.apiSug += "It is sunny, which is suitable for outdoor activities. Try to work out outside!";
    }
  }

  goBack() {
    this.navCtrl.back();
  }

  toHome() {
    this.router.navigate(['/home']);
  }

}
