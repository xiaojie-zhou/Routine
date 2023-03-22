import {Component, Injectable, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {StanfordSleepinessData} from "../data/stanford-sleepiness-data";
import {SleepService} from "../services/sleep.service";
import { Geolocation } from '@capacitor/geolocation';
import { HttpHeaders, HttpClient } from "@angular/common/http";
import {environment} from "../../environments/environment";
import * as moment from "moment/moment";
import {NavController} from "@ionic/angular";

const baseURL = "https://api.tomorrow.io/v4/"
const apiKey = 'ASFxW5G8TkzGvl6lotF1pXbkcLi4GSd6';

@Component({
  selector: 'app-step',
  templateUrl: './step.page.html',
  styleUrls: ['./step.page.scss'],
})

@Injectable({
  providedIn: 'root'
})

export class StepPage implements OnInit {

  // Step
  targetStep: any;
  realStep: any;

  // Sleep
  targetSleep: any;

  constructor(private sleepService: SleepService, private router: Router, private navCtrl:NavController) {}

  ngOnInit() {
  }

  // Step
  enterStep() {
    this.sleepService.onlylogStepData(this.targetStep, this.realStep);
  }

  // Sleep
  enterSleep() {
    this.sleepService.logTargetSleep(this.targetSleep);
  }

  toHome() {
    this.router.navigate(['/home']);
  }

  goBack() {
    this.navCtrl.back();
  }

  toRecom() {
    this.router.navigate(['/recom']);
  }
}

