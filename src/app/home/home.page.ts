import {Component, OnInit} from '@angular/core';
import { SleepService } from '../services/sleep.service';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { AlertController } from '@ionic/angular';
import {Router} from "@angular/router";
import {Geolocation} from "@capacitor/geolocation";


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  currentTime:Date = new Date();
  week = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  currentDay:string = this.week[this.currentTime.getDay()];
  coords: string = "";
  constructor(public sleepService:SleepService, private router: Router, private alertController: AlertController) {}

	ngOnInit() {
		//console.log(this.allSleepData);
	}

	/* Ionic doesn't allow bindings to static variables, so this getter can be used instead. */
	get allSleepData() {
		return SleepService.AllSleepData;
	}

  async timerAlert() {
    const alert = await this.alertController.create({
      header: 'Do you wanna use the timer?',
      buttons: [{text: 'No', role: 'Cancel'},
        {text: 'Yes', role: 'confirm', handler: () => {this.toSleepTimer()}}],
    });
    await alert.present();
  }

  toSleepTimer() {
    this.router.navigate(['/sleep-timer']);
  }

  async sleepinessAlert() {
    const alert = await this.alertController.create({
      header: 'Do you wanna choose your sleepiness?',
      buttons: [{text: 'No', role: 'Cancel'},
        {text: 'Yes', role: 'confirm', handler: () => {this.toSleepiness()}}],
    });
    await alert.present();
  }

  toSleepiness() {
    this.router.navigate(['/sleepiness']);
  }

  toLogOvernight() {
    this.router.navigate(['/log']);
  }

  toLogSleepiness() {
    this.router.navigate(['/log-sleepiness']);
  }

  toStep() {
    this.router.navigate(['/step']);
  }

  toRecom() {
    this.router.navigate(['/recom']);
  }

  toave() {
    this.router.navigate(['/ave']);
  }
}


