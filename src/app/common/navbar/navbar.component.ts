import { Component, OnInit } from '@angular/core';
import {Functions} from '../../core/main/functions';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';
import {ApiEndpoints} from '@endpoints/api';
import {ApiService} from '@service/api/api.services';
import {Filters} from '@service/api/api.filters';
import {Helper} from '@core/helper';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
    providers: [Filters, ApiService, ApiEndpoints]
})
export class NavbarComponent implements OnInit {

  portalTitle:string;
  objSession: any;
  private functions: Functions;

  constructor(private router: Router,
              private apiService: ApiService,
              private helper: Helper)
  {
    this.functions = new Functions();
    this.portalTitle = environment.projectTitle.toUpperCase();
    this.apiService = apiService;
  }

  ngOnInit()
  {

    this.functions.getLoggedUserName();
  }

  logout()
  {
     this.apiService.post(ApiEndpoints.ENDPOINT.LOGOUT, '').subscribe(
          responce => {
              if(responce.status == ApiEndpoints.RESPONCE_CODE.NO_CONTENT){
                  this.functions.destroySession(this.functions.appName);
                  location.href = '/';
              }
          },
          error => {
              if(error.json().errors[0] != undefined && error.json().errors[0].message != ''){
                  this.functions.destroySession(this.functions.appName);
                  setTimeout(function(){ location.href = '/'; },2000);
              }else{
                 alert("Opps!! Error in logout. Please try again later...");
              }
          }

      );
  }

}
