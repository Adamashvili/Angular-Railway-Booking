import { ChangeDetectorRef, Component } from '@angular/core';
import { StepRailwayApi } from '../../services/step-railway-api';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-filter',
  imports: [FormsModule],
  templateUrl: './home-filter.html',
  styleUrl: './home-filter.css',
})
export class HomeFilter {
  constructor(private stepApi: StepRailwayApi,  private cdr: ChangeDetectorRef) {
    this.getStations()
    cdr.detach()
  }
  public isDate: boolean = false;
  public stations: any[] = [];
  public cityFrom: string = "";
  public cityTo: string = "";
  public dateDeparture: string = "";

  getStations() {
    this.stepApi.getStations().subscribe((data: any) => {
      console.log(data);
      this.stations = data
      this.cdr.detectChanges()
    });
  }

  filterDepartures() {
    console.log(this.cityFrom);
    console.log(this.cityTo);
    console.log(this.dateDeparture);
    
  this.stepApi.getDepartures(this.cityFrom, this.cityTo, this.dateDeparture).subscribe((data:any) => {
    console.log(data);
    this.cdr.detectChanges()
  })
  }
}
