/**
 * Created by Ashain on 2018.
 */

import {Injectable} from "@angular/core";

@Injectable()
export class Helper{

  public status: { value: any; text: any }[];

  constructor() {

    this.status = [
      {value: 'A', text: 'Active'},
      {value: 'D', text: 'Deactive'}
    ];

  }

  public msgAlert(type, msg){

    if(type.toUpperCase() == 'S'){
      $('.msg-data').html('<div class="alert alert-success">'+msg+'</div>');
    }else if(type.toUpperCase() == 'E'){
      $('.msg-data').html('<div class="alert alert-danger">'+msg+'</div>');
    }else if(type.toUpperCase() == 'W'){
      $('.msg-data').html('<div class="alert alert-warning">'+msg+'</div>');
    }

    setTimeout(()=>{ $('.msg-data').html(''); }, 3000);

  }

    public formatDate(date) {

        if(date != '' && date != undefined){
            let d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;

            return [year, month, day].join('-');
        }

    }



}
