import { Component, OnInit } from '@angular/core';
import {ApiService} from '@service/api/api.services';
import {ActivatedRoute} from '@angular/router';
import {ApiEndpoints} from '@endpoints/api';
import {Filters} from '@service/api/api.filters';
import {Helper} from '@core/helper';
import {Functions} from '@core/functions';
//import {jsPDF} from '../trip-breakdown/trip-breakdown.component';
declare var jsPDF: any;

@Component({
  selector: 'app-driver-performance',
  templateUrl: './driver-performance.component.html',
  styleUrls: ['./driver-performance.component.css']
})
export class DriverPerformanceComponent implements OnInit {

    public loading = false;

    public driverId: any;
    bool: boolean = true;
    driverSearchData: { dateF: any; dateT: any};
    current_page:number;
    total_pages:number;
    functions: Functions;
    requestData:any[];

    requestSummary: {
        totalTripCount: any;
        billingRevenue: any;
    };

    totalTrips: any;
    earning: any;

    constructor(private apiService: ApiService,
              private route: ActivatedRoute,
              private apiFilters: Filters,
              private helper: Helper
    )
     {
      this.apiService = apiService;
      this.apiFilters = apiFilters;

      this.functions = new Functions();

      this.driverSearchData = {
             dateF: '',
             dateT: ''
      };

      this.requestSummary = {
             totalTripCount: '',
             billingRevenue: ''
      };

     this.totalTrips = '';
     this.earning = '';

    }

     ngOnInit()
    {
        this.route.params.subscribe(params => {
            this.driverId = params['id'];
        });

        this.viewDriverPerformance(1);
    }

    onSubmit() {
        this.requestData = [];
        this.viewDriverPerformance(1);
        this.bool = false;
    }

    viewDriverPerformance(page)
    {
        this.apiFilters = [
            {field: 'dateF', operator: Filters.equal, value: this. helper.formatDate(this.driverSearchData['dateF'])},
            {field: 'dateT', operator: Filters.equal, value: this. helper.formatDate(this.driverSearchData['dateT'])},
        ];

        this.apiService
            .withFilters(this.apiFilters)
            .withQueryParams({'id':this.driverId})
            .paginated({
                page: page,
                perPage: 10
            })
            .get(ApiEndpoints.ENDPOINT.LIST_DRIVER_PERFORMANCE)
            .subscribe(responce => {
                if(responce.json().data.length > 0){
                    this.requestData = responce.json().data;
                    this.current_page = responce.json().pagination.current_page;
                    this.total_pages = Math.ceil(responce.json().pagination.count / 100);
                    this.loading = true;
                }else{
                    this.helper.msgAlert('E', 'Records Not Found');
                }

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

        this.apiService
            //.withFilters(this.apiFilters)
            .withQueryParams({'id':this.driverId})
            .get(ApiEndpoints.ENDPOINT.LIST_DRIVER_PERFORMANCE_SUMMARY)
            .subscribe(responce => {
                this.requestSummary = responce.json().data;
                this.loading = true;
            }, err => {
                this.loading = false;
            });
    }

    checkNxtBtnClick()
    {
        if(this.current_page <= 1){
            return true;
        }else{
            return false;
        }

    }

    checkPrvBtnClick()
    {
        if(this.current_page >= this.total_pages){
            return true;
        }else{
            return false;
        }

    }
    downloadPDF()
    {
        var columns = [
            {title: "Date", dataKey: "date"},
            {title: "Total", dataKey: "trip_count"},
            {title: "ITC", dataKey: "itc_count"},
            {title: "Missed", dataKey: "missedHires"},
            {title: "No Of Hours", dataKey: "online_time"},

        ];

        var rows = this.requestData;

        // Only pt supported (not mm or in)
        var doc = new jsPDF('p', 'pt');
        doc.autoTable(columns, rows, {
            styles: {
                fillColor: [100, 255, 255],
                //halign: 'center',
                //overflow: 'linebreak'
            },
            columnStyles: {
               // date: {fillColor: 255}
            },
            margin: {top: 60},
            //padding: {Padding: 5},
            addPageContent: function(data) {
                doc.text("Driver Performance", 40, 40,);
            }
        });
        doc.save('Driver Performance.pdf');
    }
}
