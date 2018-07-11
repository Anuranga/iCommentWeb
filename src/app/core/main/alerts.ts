
// https://sweetalert.js.org/guides/

import {Injectable, OnInit} from '@angular/core';
import swal from 'sweetalert2';

@Injectable()
export class Alerts implements  OnInit{

  constructor() {}

  ngOnInit(){

  }

  public dialog(type, msg){

    if(type.toUpperCase() == 'S'){
      swal("Success!", msg, "success");
    }else if(type.toUpperCase() == 'E'){
      swal("Error!", msg, "error");
    }else if(type.toUpperCase() == 'W'){
      swal("Warning!", msg, "warning");
    }else if(type.toUpperCase() == 'I'){
      swal("Info!", msg);
    }

  }


}
