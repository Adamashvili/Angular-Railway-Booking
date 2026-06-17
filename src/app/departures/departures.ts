import { Component, signal } from '@angular/core';
import { StepRailwayApi } from '../services/step-railway-api';
import { ActivatedRoute, Router,  } from '@angular/router';

@Component({
  selector: 'app-departures',
  imports: [],
  templateUrl: './departures.html',
  styleUrl: './departures.css'
})
export class Departures {
  constructor(private service: StepRailwayApi, private actR: ActivatedRoute, public router: Router) {
    this.getDepartureDates()
  }

  protected departureTrains = signal<any>([])
  protected departureInfo = signal<any>([])

  getDepartureDates() {
    this.actR.queryParams.subscribe( (data:any) => 
    this.service.getDepartures(data.from, data.to, data.date).subscribe( {
      next: (departureList:any) => {
        console.log(departureList);
        this.departureTrains.set(departureList[0].trains)
        this.departureInfo.set(departureList[0])
        console.log(this.departureTrains());
        
      },
      error: (err:any) => {console.log(err)},
    } )
  
  )
  }


  gotoReserve(item:any) {
    sessionStorage.setItem("resDetails",JSON.stringify(item))
    this.router.navigate(['/reservedetails'])
  }



}
