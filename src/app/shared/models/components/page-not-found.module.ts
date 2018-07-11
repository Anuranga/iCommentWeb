import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

/* material Form Components */
import {
  MatCardModule
} from '@angular/material';

import {PageNotFoundComponent} from '../../../components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    MatCardModule
  ],
  exports: [
    PageNotFoundComponent
  ]
})
export class PageNotFoundModule{ }
