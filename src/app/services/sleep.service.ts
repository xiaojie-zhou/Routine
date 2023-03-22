import {Injectable} from '@angular/core';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { initializeApp } from "firebase/app";
import { environment } from "../../environments/environment";
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc } from "firebase/firestore";


const app = initializeApp(environment.firebaseConfig);
const db = getFirestore(app);

const overnightRef = collection(db, "sleep-timer");
const overnightStruct= {
  summary: "",
  dateInfo: ""
}

const sleepinessRef = collection(db, "sleepiness");
const sleepinessStruct= {
  summary: "",
  dateInfo: ""
}

/*
const stepRef = collection(db, "step");
const stepStruct= {
  summary: "",
  targetStep: 0,
  realStep: 0
}
 */


@Injectable({
  providedIn: 'root'
})
export class SleepService{
  LoadDefaultData:boolean = true;
  public static AllSleepData:SleepData[] = [];
  public static AllSleepinessData:StanfordSleepinessData[] = [];
  overnightResult: { summary: string; dateInfo: string; }[] = [];
  sleepinessResult: { summary: string; dateInfo: string; }[] = [];

  // Step
  StepData:{targetStep: number; realStep: number;}[] = [];
  //stepResult: {summary: string; targetStep: string; realStep: string;}[] = [];
  //public static AllStepData:any[] = [];

  // Sleep
  targetSleepList: {tarH: number, tarM: number}[] =  [];
  AllOvernightData:OvernightSleepData[] = [];
  currH: any = 0;
  currM: any = 0;

  constructor() {
    /*this.clearFB();

		if(this.LoadDefaultData) {
			this.addDefaultData();
      this.LoadDefaultData = false;
    }
     */
	}

  // Step
  public onlylogStepData(targetStep: number, realStep: number) {
    this.StepData.push({targetStep: targetStep, realStep: realStep});
  }
  /*public addStepFB(targetStep: number, realStep: number){
    let gap = targetStep - realStep;
    stepStruct.summary = "You have to walk " + gap + " steps.";
    stepStruct.targetStep = targetStep;
    stepStruct.realStep = realStep;
    addDoc(stepRef, stepStruct)
      .then(docRef => {
        console.log("Step has been added successfully");
      })
      .catch(error => {
        console.log(error);
      })
  }

   */
  /*
  public async getStepFB() {
    this.stepResult.length = 0
    let stepFB = await getDocs(stepRef);
    stepFB.forEach(doc => {
      console.log(doc.data());
      console.log(doc.data()['targetStep']);
      console.log(typeof (doc.data()['targetStep']));
      this.stepResult.push({summary:doc.data()['summary'],
        targetStep: doc.data()['targetStep'],
        realStep: doc.data()['realStep']})
    })
  }

   */
  /*public logStepData(targetStep: number, realStep: number) {
    stepStruct.targetStep = targetStep;
    stepStruct.realStep = realStep;
    SleepService.AllStepData.push(stepStruct);
    SleepService.AllStepData.push(stepStruct);
    this.addStepFB(targetStep, realStep);
  }
   */

  // Sleep
  public logTargetSleep(targetSleep: string) {
    let h = parseInt(targetSleep.split(":")[0]);
    let m = parseInt(targetSleep.split(":")[1]);
    this.targetSleepList.push({tarH: h, tarM: m});
  }
  public onlylogOvernightData(sleepData:OvernightSleepData) {
    this.AllOvernightData.push(sleepData);
  }

	public addDefaultData() {
		this.logOvernightData(new OvernightSleepData(new Date('March 14, 2023 01:03:00'), new Date('March 15, 2023 12:36:00')));
		this.logOvernightData(new OvernightSleepData(new Date('March 15, 2023 23:59:00'), new Date('March 16, 2023 09:25:00')));
    this.logOvernightData(new OvernightSleepData(new Date('March 16, 2023 21:01:00'), new Date('March 17, 2023 08:06:00')));
    this.logOvernightData(new OvernightSleepData(new Date('March 17, 2023 22:30:00'), new Date('March 18, 2023 10:30:00')));
    this.logOvernightData(new OvernightSleepData(new Date('March 18, 2023 03:15:00'), new Date('March 19, 2023 13:15:00')));
    this.logOvernightData(new OvernightSleepData(new Date('March 19, 2023 20:47:00'), new Date('March 20, 2023 06:00:00')));
    this.logOvernightData(new OvernightSleepData(new Date('March 20, 2023 23:11:00'), new Date('March 21, 2023 08:30:00')));
	}

  public async clearFB() {
    let qs1 = await getDocs(collection(db, "sleep-timer"));
    console.log("sleep-timer", qs1.size);
    if (qs1.size !== 0) {
      qs1.forEach(async document => {
        await deleteDoc(doc(db, "sleep-timer", document.id));
      })
    }
    let qs2 = await getDocs(collection(db, "sleepiness"));
    console.log("sleepiness", qs2.size);
    if (qs2.size !== 0) {
      qs2.forEach(async document => {
        await deleteDoc(doc(db, "sleepiness", document.id));
      })
    }
  }

  public addOvernightFB(sleepData:OvernightSleepData){
    overnightStruct.summary = sleepData.summaryString();
    overnightStruct.dateInfo = sleepData.dateString();
      addDoc(overnightRef, overnightStruct)
        .then(docRef => {
          console.log("Document has been added successfully");
        })
        .catch(error => {
          console.log(error);
        })
  }

  public addSleepinessFB(sleepData:StanfordSleepinessData){
    sleepinessStruct.summary = sleepData.summaryString();
    sleepinessStruct.dateInfo = sleepData.dateInfo();
    addDoc(sleepinessRef, sleepinessStruct)
      .then(docRef => {
        console.log("Document has been added successfully");
      })
      .catch(error => {
        console.log(error);
      })
  }


  public async getOvernightFB() {
    this.overnightResult.length = 0
    let overnightFB = await getDocs(overnightRef);
    overnightFB.forEach(doc => {
      console.log(doc.data());
      console.log(doc.data()['summary']);
      console.log(doc.data()['dateInfo']);
      this.overnightResult.push({summary: doc.data()['summary'],
        dateInfo: doc.data()['dateInfo']});
    })
  }

  public async getSleepinessFB() {
    this.sleepinessResult.length = 0
    let sleepinessFB = await getDocs(sleepinessRef);
    sleepinessFB.forEach(doc => {
      console.log(doc.data());
      console.log(doc.data()['summary']);
      console.log(doc.data()['dateInfo']);
      this.sleepinessResult.push({summary: doc.data()['summary'],
        dateInfo: doc.data()['dateInfo']});
    })
  }


  public logOvernightData(sleepData:OvernightSleepData) {
    SleepService.AllSleepData.push(sleepData);
    this.addOvernightFB(sleepData);
  }

	public logSleepinessData(sleepData:StanfordSleepinessData) {
		SleepService.AllSleepData.push(sleepData);
		SleepService.AllSleepinessData.push(sleepData);
    this.addSleepinessFB(sleepData);
	}

}

