/**
 * Created by Ashain on 2018.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {DashboardModule} from './models/components/dashboard.module';
import {LoginModule} from './models/components/login.module';


import {DataHolder} from '@core/dataholder';
import {PageNotFoundModule} from './models/components/page-not-found.module';

@NgModule({
  imports: [
    CommonModule,
    DashboardModule,
    LoginModule,
    PageNotFoundModule,
  ],
  exports:[
    DashboardModule,
    LoginModule,
    PageNotFoundModule,
  ],
  providers:[DataHolder]
})
export class SharedModule{ }
