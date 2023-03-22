import { Component, OnInit } from '@angular/core';
import {SleepService} from "../services/sleep.service";
import {Router} from "@angular/router";
import {AlertController, NavController} from "@ionic/angular";
import {StanfordSleepinessData} from "../data/stanford-sleepiness-data";


@Component({
  selector: 'app-sleepiness',
  templateUrl: './sleepiness.page.html',
  styleUrls: ['./sleepiness.page.scss'],
})
export class SleepinessPage implements OnInit {
  choicesList: any;
  currentChoice: any;
  choiceTime: any;
  summary: any;
  constructor(private sleepService: SleepService, private router: Router, private alertController: AlertController, private navCtrl:NavController) {}

  ngOnInit() {
    this.choicesList = StanfordSleepinessData.ScaleValues;
    this.choiceTime = new Date();
  }

  beChosen() {
    this.chosenAlert(this.currentChoice, this.choiceTime);
  }

  async chosenAlert(choiceIndex: number, choiceDate: Date) {
    const alert = await this.alertController.create({
      header: 'You wanna choose this one?',
      buttons: [{text: 'No', role: 'Cancel'},
        {text: 'Yes', role: 'confirm', handler: () => {this.logSleepiness(choiceIndex, choiceDate)}}],
    });
    await alert.present();
  }

  logSleepiness(choiceIndex: number, choiceDate: Date) {
    var sleepiness = new StanfordSleepinessData(choiceIndex, choiceDate);
    this.sleepService.logSleepinessData(sleepiness);
    this.showSummary();
    console.log(this.summary);
  }

  showSummary() {
    this.summary =
      "Time: "
      + this.choiceTime.toLocaleDateString('en-US', {month: 'long', day: 'numeric' })
      + ", "
      + ("0" + this.choiceTime.getHours()).slice(-2)
      + ":"
      + ("0" + this.choiceTime.getMinutes()).slice(-2)
      + "; Status: "
      + this.choicesList[this.currentChoice];
  }

  goBack() {
    this.navCtrl.back();
  }

  toHome() {
    this.router.navigate(['/home']);
  }

  toSleepTimer() {
    this.router.navigate(['/sleep-timer']);
  }
  toLogSleepiness() {
    this.router.navigate(['/log-sleepiness']);
  }

  toLogOvernight() {
    this.router.navigate(['/log']);
  }
}

