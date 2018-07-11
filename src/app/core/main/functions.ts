/**
 * Created by Ashain on 2018.
 */

import {Injectable} from "@angular/core";
import {environment} from '../../../environments/environment';

@Injectable()
export class Functions{

  public appName: string;
  public sessionTimeout: any;

  constructor() {

    this.appName = environment.appName;
    this.sessionTimeout = environment.sessionTimeout;

  }

  // LOGIN :::::::::::::::::::::::::::::::::::::::::::

  // manage session
  setSession(name, objData) {
    localStorage.setItem(name, JSON.stringify(objData));
  }

  getSession(name) {
    return localStorage.getItem(name);
  }

  destroySession(name){
    localStorage.removeItem(name);
  }

  isValidSession(){

    let objSession = this.getSession(this.appName);

    if(objSession === null)
    {
      return false;
    }

    // timestamp given in milliseconds (3600000 = 1 hour)
    if((JSON.parse(objSession).timestamp + (3600000 * parseInt(this.sessionTimeout))) <= $.now())
    {
      this.destroySession(this.appName);
      return false;
    }

    return true;
  }

  getLoggedUserName() {
    let objSession = this.getSession(this.appName);
    if(objSession != undefined) {
      $('.lg-user').html(JSON.parse(objSession).user.name);
    }else{
      return "";
    }
  }

  getLoggedUserRole() {
    let objSession = this.getSession(this.appName);
    if(objSession != undefined) {
      return JSON.parse(objSession).user.role;
    }else{
      return "";
    }
  }

  getToken() {
    let objSession = this.getSession(this.appName);
    if(objSession != undefined){
      return JSON.parse(objSession).token;
    }else{
      return "";
    }
  }

}
