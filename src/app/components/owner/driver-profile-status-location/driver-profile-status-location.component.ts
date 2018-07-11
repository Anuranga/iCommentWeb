import { Component, OnInit } from '@angular/core';
import {ApiEndpoints} from '@endpoints/api';
import {Filters} from '@service/api/api.filters';
import {ApiService} from '@service/api/api.services';
import {ActivatedRoute} from '@angular/router';
import {Functions} from '@core/functions';
import {Helper} from '@core/helper';

@Component({
  selector: 'app-driver-profice-status-location',
  templateUrl: './driver-profile-status-location.component.html',
  styleUrls: ['./driver-profile-status-location.component.css']
})
export class DriverProfileStatusLocationComponent implements OnInit {
  public loading = false;
  title: string = 'Driver Current Location';
  functions: Functions;

  requestData: {
      id: number;
      name: any;
      phone: any;
      contactNumber: any,
      emergencyNumber: any;
      permanentAddress: any;
      deviceName: any,
      dob: any,
      vehicleType: any,
      taxiModel: any,
      taxiNumber: any,
      joinedDate: any,
      profile_status: any,
  };

  locationData:{
      id: number,
      name: any,
      latitude: any,
      longitude: any,
      travel_status: any,
      vehicleType: any,
  };
  dataLoading : boolean;
  lat: any;
  lng: any;

  public icon = {
    url: 'https://www.dfi-elec.fr/wp-content/uploads/2017/09/map-marker-icon.png',
    scaledSize: {
      height: 40,
      width: 40
    }
  };
  public driverId: any;

  constructor(private apiService: ApiService,
              private route: ActivatedRoute,
              private helper: Helper,
  )
  {
      this.dataLoading = true;

      this.apiService = apiService;

      this.functions = new Functions();

      this.requestData = {
          id: 0,
          name: '',
          phone: '',
          contactNumber: '',
          emergencyNumber: '',
          permanentAddress: '',
          deviceName: '',
          dob: '',
          vehicleType: '',
          taxiModel: '',
          taxiNumber: '',
          joinedDate: '',
          profile_status: '',
      };

      this.locationData = {
          id: 0,
          name: '',
          latitude: 0,
          longitude: 0,
          travel_status: '',
          vehicleType: '',
      };
  }

  ngOnInit()
  {
    this.route.params.subscribe(params => {
       this.driverId = params['id'];
    });

    this.viewDriverInfo();
    this.viewDriverLocation();

  }

    viewDriverInfo()
    {
        this.apiService.withQueryParams({'id':this.driverId})
            .get(ApiEndpoints.ENDPOINT.LIST_DRIVER_INFO)
            .subscribe(responce => {
                this.requestData = responce.json().data;
                this.loading = true;
                this.dataLoading = false;
        }, err => {
              if(err.status == 400){
                this.loading = false;
                alert("Opps!! Trying to Access Details of a Driver not belonging to Owner");
              }
              else {
                this.loading = false;
                alert("Opps!! Error in logout. Please try again later...");
                this.functions.destroySession(this.functions.appName);
                location.href = '/';
              }
        });
    }

    viewDriverLocation()
    {
        this.apiService.withQueryParams({'id':this.driverId})
            .get(ApiEndpoints.ENDPOINT.LIST_DRIVER_LOCATION_INFO)
            .subscribe(responce => {
            this.locationData = responce.json().data;
            this.lat = parseFloat(responce.json().data.latitude);
            this.lng = parseFloat(responce.json().data.longitude);
            this.loading = true;
            this.dataLoading = false;
        }, err => {
            this.loading = false;
        });
    }

}
