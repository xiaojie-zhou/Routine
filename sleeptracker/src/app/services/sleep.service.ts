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


@Injectable({
  providedIn: 'root'
})
export class SleepService{
  LoadDefaultData:boolean = true;
	public static AllSleepData:SleepData[] = [];
	public static AllOvernightData:OvernightSleepData[] = [];
	public static AllSleepinessData:StanfordSleepinessData[] = [];
  overnightResult: { summary: string; dateInfo: string; }[] = [];
  sleepinessResult: { summary: string; dateInfo: string; }[] = [];

  constructor() {
    //this.clearFB();
/*
		if(this.LoadDefaultData) {
			this.addDefaultData();
      this.LoadDefaultData = false;
    }
 */

	}

	public addDefaultData() {
		this.logOvernightData(new OvernightSleepData(new Date('February 18, 2021 01:03:00'), new Date('February 18, 2021 09:25:00')));
    this.logSleepinessData(new StanfordSleepinessData(4, new Date('February 19, 2021 14:38:00')));
		this.logOvernightData(new OvernightSleepData(new Date('February 20, 2021 23:11:00'), new Date('February 21, 2021 08:03:00')));
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
    SleepService.AllOvernightData.push(sleepData);
    this.addOvernightFB(sleepData);
  }

	public logSleepinessData(sleepData:StanfordSleepinessData) {
		SleepService.AllSleepData.push(sleepData);
		SleepService.AllSleepinessData.push(sleepData);
    this.addSleepinessFB(sleepData);
	}
}

