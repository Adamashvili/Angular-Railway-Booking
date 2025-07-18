import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GeoRailwayapis } from '../../services/geo-railwayapis';

@Component({
  selector: 'app-railway-cards',
  imports: [],
  templateUrl: './railway-cards.html',
  styleUrl: './railway-cards.css',
})
export class RailwayCards implements OnInit {
  constructor(
    private geoRailwayServ: GeoRailwayapis,
    private cdr: ChangeDetectorRef
  ) {
    this.getAllInfo();
    this.cdr.detach();
    window.scrollTo(0, 0);
  }
  ngOnInit(): void {}

  public benefits: any[] = [];

  getAllInfo() {
    this.geoRailwayServ.getHomeInfos().subscribe((data: any) => {
      this.benefits = data.data.benefits;
      this.cdr.detectChanges();
    });
  }
}
