/**
 * Created by Ashain on 2018.
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import { AgmCoreModule } from '@agm/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';

/* Bootstrap */
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';

// components
import { AppComponent } from './app.component';
import {SharedModule} from './shared/shared.module';

// routing
import {AppRouting} from './app.routs';
import {HashLocationStrategy, LocationStrategy, PathLocationStrategy} from '@angular/common';

// common components
import {NavbarComponent} from './common/navbar/navbar.component';
import {SidemenuComponent} from './common/sidemenu/sidemenu.component';
import {FooterComponent} from './common/footer/footer.component';
import {AssignTaxiForOwnersComponent} from './components/owner/assign-taxi-for-owners/assign-taxi-for-owners.component';
import {DriverProfileStatusLocationComponent} from './components/owner/driver-profile-status-location/driver-profile-status-location.component';
import {FormsModule} from '@angular/forms';
import {ApiService} from '@service/api/api.services';
import {Http, HttpModule} from '@angular/http';
import {Helper} from '@core/helper';
import {Filters} from '@service/api/api.filters';
import {MatDatepicker, MatNativeDateModule, MatSelectModule} from '@angular/material';
import {DriverPerformanceComponent} from './components/owner/driver-performance/driver-performance.component';
import {DriverFinanceStatementComponent} from './components/owner/driver-finance-statement/driver-finance-statement.component';
import { TripBreakdownComponent } from './components/owner/trip-breakdown/trip-breakdown.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidemenuComponent,
    FooterComponent,
    AssignTaxiForOwnersComponent,
    DriverProfileStatusLocationComponent,
    DriverPerformanceComponent,
    DriverFinanceStatementComponent,
    TripBreakdownComponent,
  ],
  imports: [
    AppRouting,
    BrowserModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    NoopAnimationsModule,
    SharedModule,
    FormsModule,
    HttpModule,
    MatCardModule,
    MatButtonModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatSelectModule,
    MatProgressBarModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAPaFdN4emBJpPgqp9xF5iy35RKDRfXDvU'
    }),
    MatDatepickerModule
  ],
  providers:[{provide:LocationStrategy, useClass:HashLocationStrategy}, ApiService, Helper, Filters], // http://www.domain.com/#/page
  bootstrap: [AppComponent]
})
export class AppModule { }
