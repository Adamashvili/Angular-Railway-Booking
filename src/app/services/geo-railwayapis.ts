import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeoRailwayapis {
  constructor(private http: HttpClient) {}
  getHomeInfos() {
   return this.http.get("https://gr.com.ge/api/page-content/home")
  }
}
