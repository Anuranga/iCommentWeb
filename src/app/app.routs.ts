/**
 * Created by Ashain on 2018.
 */

import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

// Define Routes ----------------------------------------

import {DashboardComponent} from "./components/dashboard/dashboard.component";

import {LoginComponent} from "./components/login/login.component";
import {AppComponent} from './app.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {AssignTaxiForOwnersComponent} from './components/owner/assign-taxi-for-owners/assign-taxi-for-owners.component';
import { DriverProfileStatusLocationComponent } from './components/owner/driver-profile-status-location/driver-profile-status-location.component';
import { DriverPerformanceComponent } from './components/owner/driver-performance/driver-performance.component';
import { DriverFinanceStatementComponent } from './components/owner/driver-finance-statement/driver-finance-statement.component';
import { TripBreakdownComponent } from './components/owner/trip-breakdown/trip-breakdown.component';

const appRoutes: Routes = [
  {
    path: 'login',
    component:LoginComponent
  },
  {
    path: 'logout',
    component:AppComponent
  },
  {
    path: '',
    component:DashboardComponent
  },
  {
    path: 'owner/assign-taxi-for-owners',
    component:AssignTaxiForOwnersComponent
  },
  {
    path: 'owner/:id/driver-performance',
    component:DriverPerformanceComponent
  },
  {
    path: 'owner/:id/driver-finance-statement', //owner/9624/driver-performance
    component:DriverFinanceStatementComponent
  },
  {
    path: 'owner/:id/trip-breakdown',
    component:TripBreakdownComponent
  },
  {
    path: 'owner/:id/driver-profile-status-location',
    component:DriverProfileStatusLocationComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

//---------------------------------------- DriverPerformanceComponent

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
})

export class AppRouting{}
