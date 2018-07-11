import { Component, OnInit } from '@angular/core';
import {Functions} from '@core/functions';
import {Router} from '@angular/router';

import {environment} from '../../../environments/environment';

/* services related */
import {ApiService} from '@service/api/api.services';
import {Filters} from '@service/api/api.filters';
import {ApiEndpoints} from '@endpoints/api';

import * as jwt_decode from 'jwt-decode';

import {Helper} from '@core/helper';
import {UUID} from 'angular2-uuid';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [Filters, ApiService, ApiEndpoints]
})
export class LoginComponent implements OnInit {

  loginFormData: object;
  functions: Functions;
  token: string;
  objSession: any;
  logged: boolean;
  projectTitle: string;
  logoImage: string;
  loginEmailMgs: string;
  loginPasswordMgs: string;
  buttonStatus: boolean;
  private countDown: any;
  private timeleft: number;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private helper: Helper,
  )
  {
    let uuid = UUID.UUID();
    this.timeleft = 30;

    this.loginFormData = {
      phone: '',
      password: '',
      device: 'owner-portal',
      device_id :  uuid
     };

    this.projectTitle = environment.projectTitle;
    this.functions = new Functions();
    this.objSession = {};
    this.logged = false;
    this.apiService = apiService;
    this.logoImage = 'assets/img/pickme-logo.svg';
    this.loginEmailMgs = '';
    this.loginPasswordMgs = '';
  }

  ngOnInit() {

    //localStorage.removeItem('buttonDisable');

    let bdsbl = localStorage.getItem('buttonDisable');
    this.buttonStatus = (bdsbl == '1')?true:false;

    if(this.buttonStatus){
          this.countDownFuntion();
     }

    if(this.functions.isValidSession()){
      this.logged = true;
      this.router.navigate(['/']);
    }else{
      this.logged = false;
      this.router.navigate(['/login']);
    }

  }

  login(){

    if(this.loginFormData['phone'] != '' && this.loginFormData['password'] != ''){

      this.token = '';

        this.apiService.post(ApiEndpoints.ENDPOINT.LOGIN, this.loginFormData).subscribe(
        responce => {

          if(responce.status == ApiEndpoints.RESPONCE_CODE.OK){

            this.token = responce.json().data.token;
            this.objSession.timestamp = $.now();
            this.objSession.token = this.token;
            this.objSession.user = jwt_decode(this.token).data;
            this.objSession.permissions = '';
            this.logged = true;
            this.functions.setSession(this.functions.appName, this.objSession);
            this.router.navigate(['/']);
            this.removeClientID();
            localStorage.removeItem('buttonDisable');
            location.reload();
          }

        },
        error => {

            if(error.status == ApiEndpoints.RESPONCE_CODE.BAD_REQUEST){ //400

                if(error.json().errors[0].code == 10004){ //400
                    this.helper.msgAlert('E',error.json().errors[0].message);
                    localStorage.setItem('buttonDisable', '1')
                    this.buttonStatus = true;
                    this.countDownFuntion();
                }

                this.helper.msgAlert('E','Incorrect login credentials');
            }

            if(error.status == ApiEndpoints.RESPONCE_CODE.UNPROCESSABLE){ //400
                this.helper.msgAlert('E','Incorrect login credentials');
            }

            if(error.status == ApiEndpoints.RESPONCE_CODE.SERVER_ERROR){
                this.helper.msgAlert('E','Incorrect login credentials');
            }


        }

      );

    }else {

      this.loginEmailMgs = '';
      this.loginPasswordMgs = '';

      if (this.loginFormData['phone'] == '' && this.loginFormData['password'] == '') {
        this.loginEmailMgs = 'Please Enter phone';
        this.loginPasswordMgs = 'Please Enter Password';
      }else if (this.loginFormData['phone'] == '') {
        this.loginEmailMgs = 'Please Enter phone';
      }else if (this.loginFormData['password'] == ''){
        this.loginPasswordMgs = 'Please Enter Password';
      }else{
        this.loginEmailMgs = '';
        this.loginPasswordMgs = '';
      }

    }

  }

  removeClientID(){
    localStorage.removeItem("clientID");
  }

  countDownFuntion()
  {
      let downloadTimer = setInterval(()=>{
          this.timeleft--;
          this.countDown = this.timeleft;
          if(this.timeleft <= 0){
              clearInterval(downloadTimer);
              localStorage.setItem('buttonDisable', '0')
              this.timeleft = 30;
              this.buttonStatus = false;
          }
      },1000);
  }
}
