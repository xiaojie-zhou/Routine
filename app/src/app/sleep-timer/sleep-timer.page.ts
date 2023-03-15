import { Component, OnInit } from '@angular/core';
import {Timer} from "timer-node";
import {AlertController, NavController} from "@ionic/angular";
import {OvernightSleepData} from "../data/overnight-sleep-data";
import { SleepService } from '../services/sleep.service';
import {Router} from "@angular/router";


@Component({
  selector: 'app-sleep-timer',
  templateUrl: './sleep-timer.page.html',
  styleUrls: ['./sleep-timer.page.scss'],
})
export class SleepTimerPage implements OnInit {
  timer: any;
  interValId: any;
  currentTime: any = {}
  from: any;
  to: any;
  diff: any;
  showDiff: boolean = false;
  constructor(public sleepService:SleepService, private router: Router, private alertController: AlertController, private navCtrl:NavController) { }

  ngOnInit() {
    this.timer = new Timer({
      startTimestamp:new Date().getTime()
    })
    this.currentTime = this.timer.time();
  }

  startTimer() {
    this.timer.start();
    this.from = new Date();
    this.interValId = setInterval(() => {
      this.currentTime = this.timer.time();
    }, 1000)
  }

  async startAlert() {
    const alert = await this.alertController.create({
      header: 'Do you wanna start the timer?',
      buttons: [{text: 'No', role: 'cancel'},
        {text: 'Yes', role: 'confirm', handler: () => {this.startTimer();}}]
    });
    await alert.present();
  }

  terminateTimer() {
    this.timer.stop();
    this.to = new Date();
    if (this.interValId) {
      clearInterval(this.interValId);
      this.interValId = undefined;
      this.showSummary();
      this.logOvernight();
    }
  }

  logOvernight() {
    let sleepDuration = new OvernightSleepData(this.from, this.to);
    this.sleepService.logOvernightData(sleepDuration);
  }

  async terminateAlert() {
    const alert = await this.alertController.create({
      header: 'Do you wanna terminate?',
      buttons: [{text: 'No', role: 'cancel'},
        {text: 'Yes', role: 'confirm', handler: () => {this.terminateTimer();}}]
    });
    await alert.present();
  }

  showSummary() {
    // Calculate the difference in milliseconds
    let difference_ms = this.to - this.from;
    // Convert to hours and minutes
    this.diff = Math.floor(difference_ms / (1000*60*60)) + " hours, "
      + Math.floor(difference_ms / (1000*60) % 60) + " minutes, "
      + Math.floor(difference_ms / 1000 % 60) + " seconds.";
    this.showDiff = true;
  }

  pause() {
    this.timer.pause();
  }

  async pauseAlert() {
    const alert = await this.alertController.create({
      header: 'Do you wanna pause?',
      buttons: [{text: 'No', role: 'cancel'},
        {text: 'Yes', role: 'confirm', handler: () => {this.pause();}}]
    });
    await alert.present();
  }

  resume() {
    this.timer.resume();
  }

  async resumeAlert() {
    const alert = await this.alertController.create({
      header: 'Do you wanna resume?',
      buttons: [{text: 'No', role: 'cancel'},
        {text: 'Yes', role: 'confirm', handler: () => {this.resume();}}]
    });
    await alert.present();
  }

  reset() {
    this.timer.stop();
    if (this.interValId) {
      clearInterval(this.interValId);
      this.interValId = undefined;
    }
    this.currentTime.h = 0;
    this.currentTime.m = 0;
    this.currentTime.s = 0;
  }

  async resetAlert() {
    const alert = await this.alertController.create({
      header: 'Do you wanna reset?',
      buttons: [{text: 'No', role: 'cancel'},
        {text: 'Yes', role: 'confirm', handler: () => {this.reset();}}]
    });
    await alert.present();
  }

  goBack() {
    this.navCtrl.back();
  }

  toHome() {
    this.router.navigate(['/home']);
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
}

