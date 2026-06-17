import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { GeoRailwayapis } from '../../services/geo-railwayapis';

@Component({
  selector: 'app-railway-cards',
  imports: [],
  templateUrl: './railway-cards.html',
  styleUrl: './railway-cards.css',
})
export class RailwayCards {
  constructor(private geoRailwayServ: GeoRailwayapis) {
    this.getAllInfo();
    window.scrollTo(0, 0);
  }
  

  public benefits = signal<any>([]);

  getAllInfo() {
    this.geoRailwayServ.getHomeInfos().subscribe((data: any) => {
      this.benefits.set(data.data.benefits);
    });
  }
}
