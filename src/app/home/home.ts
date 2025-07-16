import { Component } from '@angular/core';
import { HomeFilter } from "./home-filter/home-filter";

@Component({
  selector: 'app-home',
  imports: [HomeFilter],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
