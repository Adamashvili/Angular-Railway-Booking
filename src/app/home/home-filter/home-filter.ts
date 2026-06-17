import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { StepRailwayApi } from '../../services/step-railway-api';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-filter',
  imports: [FormsModule],
  templateUrl: './home-filter.html',
  styleUrl: './home-filter.css',
})
export class HomeFilter {
  constructor(
    private stepApi: StepRailwayApi,
    public router: Router,
  ) {
    this.getStations();
  }
  public isDate: boolean = false;
  public stations = signal<any>([]);
  public cityFrom: string = '';
  public cityTo: string = '';
  public dateDeparture: string = '';
  public passengers: number = 1;

  getStations() {
    this.stepApi.getStations().subscribe((data: any) => {
      console.log(data);
      this.stations.set(data);
    });
  }

  filterDepartures() {
    
    sessionStorage.setItem('passenger', this.passengers.toString());
    sessionStorage.setItem('date', this.dateDeparture);
    this.router.navigate(['/departures'], {
      queryParams: {
        from: this.cityFrom,
        to: this.cityTo,
        date: this.dateDeparture,
      },
    });
  }
}
