import { Component, OnInit } from '@angular/core';
import {Filters} from '@service/api/api.filters';
import {ApiEndpoints} from '@endpoints/api';
import {ApiService} from '@service/api/api.services';
import {ActivatedRoute} from '@angular/router';
import {Helper} from '@core/helper';
import {Functions} from '@core/functions';
//import * as jsPDF from 'jspdf';

declare var jsPDF: any;

@Component({
  selector: 'app-trip-breakdown',
  templateUrl: './trip-breakdown.component.html',
  styleUrls: ['./trip-breakdown.component.css']
})
export class TripBreakdownComponent implements OnInit {
    driverBreakData: { search_keyword: any; dateF: any; dateT: any};
    public driverId: any;
    bool: boolean = true;
    public loading = false;
    current_page:number;
    total_pages:number;
    functions: Functions;
    requestData:any[];
    requestDataPDF:any[];
    dataLoading : boolean;

    constructor(private apiService: ApiService,
                private route: ActivatedRoute,
                private apiFilters: Filters,
                private helper: Helper
    )
    {
        this.dataLoading = true;

        this.apiService = apiService;
        this.apiFilters = apiFilters;

        this.functions = new Functions();

        this.driverBreakData = {
            search_keyword: '',
            dateF: '',
            dateT: ''
        };
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.driverId = params['id'];
        });
        this.viewDriverBreakdown(1);
    }

    onSubmit() {
        this.dataLoading = true;
        this.requestData = [];
        this.requestDataPDF = [];
        this.viewDriverBreakdown(1);
        this.bool = false;
    }

    viewDriverBreakdown(page)
    {
        this.apiFilters = [
            {field: 'search_keyword', operator: Filters.equal, value: this.driverBreakData['search_keyword']},
            {field: 'dateF', operator: Filters.equal, value: this. helper.formatDate(this.driverBreakData['dateF'])},
            {field: 'dateT', operator: Filters.equal, value: this. helper.formatDate(this.driverBreakData['dateT'])},
        ];

        this.apiService
            .withFilters(this.apiFilters)
            .withQueryParams({'id':this.driverId})
            .paginated({
                page: page,
                perPage: 10
            })
            .get(ApiEndpoints.ENDPOINT.LIST_DRIVER_BREAKDOWN)
            .subscribe(responce => {
                if(responce.json().data.length > 0){
                    this.requestData = responce.json().data;
                    this.loading = true;
                    this.dataLoading = false;
                    this.current_page = responce.json().pagination.current_page;
                    this.total_pages = Math.ceil(responce.json().pagination.count / 100);
                }else {
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
            .withFilters(this.apiFilters)
            .withQueryParams({'id':this.driverId})
            .get(ApiEndpoints.ENDPOINT.LIST_DRIVER_BREAKDOWN_PDF)
            .subscribe(responce => {
                this.requestDataPDF = responce.json().data;
                this.dataLoading = false;
            }, err => {
                this.loading = false;
            });
    }

    clearFeilds()
    {
      this.driverBreakData = {
        search_keyword: '',
        dateF: '',
        dateT: ''
      };
      this.onSubmit();
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
            {title: "Created Date", dataKey: "created_date"},
            {title: "Trip ID", dataKey: "trip_id"},
            {title: "Description", dataKey: "description"},
            {title: "CREDIT", dataKey: "CREDIT"},
            {title: "DEBIT", dataKey: "DEBIT"},
        ];

        var rows = this.requestDataPDF;

        // Only pt supported (not mm or in)
        var doc = new jsPDF('p', 'pt');
        doc.autoTable(columns, rows, {
            styles: {
                fillColor: [100, 255, 255],
                //overflow: 'linebreak'
            },
            columnStyles: {
                created_date: {columnWidth: 80, overflow: 'linebreak'},
                trip_id: {columnWidth: 70, overflow: 'linebreak'},
                description: {overflow: 'linebreak' },
                CREDIT: {columnWidth: 65, halign: 'right', overflow: 'linebreak'},
                DEBIT: {columnWidth: 65, halign: 'right', overflow: 'linebreak'}
            },
            margin: {top: 60},
            addPageContent: function(data) {
                doc.text("Trip Breakdown", 40, 40);
            }
        });
        doc.save('Trip BreakDown.pdf');
    }
}
