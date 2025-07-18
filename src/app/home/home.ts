import { Component } from '@angular/core';
import { HomeFilter } from "./home-filter/home-filter";
import { RailwayCards } from "./railway-cards/railway-cards";

@Component({
  selector: 'app-home',
  imports: [HomeFilter, RailwayCards],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  constructor() {
    window.scrollTo(0,0)
  }
}
