import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Departures } from './departures/departures';
import { ReserveDetails } from './reserve-details/reserve-details';

export const routes: Routes = [
    {path: "", component: Home},
    {path: "departures", component: Departures},
    {path: "reservedetails", component: ReserveDetails},
];
