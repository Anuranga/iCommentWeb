import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Functions} from './core/main/functions';
import {environment} from '../environments/environment';

import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  logged:boolean
  private functions: Functions;

  constructor(private router: Router, private actrouter:ActivatedRoute) {

    this.functions = new Functions();
    this.logged = true;

  }

  ngOnInit() {

    console.log(environment.enviromentName);

    if(!this.functions.isValidSession()){
      this.logged = false;
      this.router.navigate(['/login']);
    }else {
      this.functions.getLoggedUserName();
      this.logged = true;
    }

  }

}
