import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StepRailwayApi {
  constructor(private http: HttpClient) {}

  getStations() {
    return this.http.get("https://railway.stepprojects.ge/api/stations");
  }

  getDepartures(from: string, to:string, date: any) {
    return this.http.get(`https://railway.stepprojects.ge/api/getdeparture?from=${from}&to=${to}&date=${date}`)
  }
  
}
