import { Component, OnInit } from '@angular/core';
import {Filters} from '@service/api/api.filters';
import {ApiEndpoints} from '@endpoints/api';
import {ApiService} from '@service/api/api.services';
import {ActivatedRoute} from '@angular/router';
import {Helper} from '@core/helper';
import {Functions} from '@core/functions';
//import {jsPDF} from '../trip-breakdown/trip-breakdown.component';

declare var jsPDF: any;

@Component({
  selector: 'app-driver-finance-statement',
  templateUrl: './driver-finance-statement.component.html',
  styleUrls: ['./driver-finance-statement.component.css']
})
export class DriverFinanceStatementComponent implements OnInit {

    driverFinaceData: { search_keyword: any; dateF: any; dateT: any};
    public driverId: any;
    functions: Functions;
    bool: boolean = true;
    public loading = false;
    current_page:number;
    total_pages:number;
    requestData:any[];
    requestDataPDF:any[];
    dataLoading : boolean;

    requestFinanceDataSummary: {
        balance: any;
    };
    requestPerformanceDataSummary: {
        totalTripCount: any;
        billingRevenue: any;
    };

     paymentTypeList = [
        {value: '', viewValue: 'All'},
        {value: '1', viewValue: 'Cash'},
        {value: '2', viewValue: 'Credit'}
      ];


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

        this.driverFinaceData = {
            search_keyword: '',
            dateF: '',
            dateT: ''
        };

        this.requestFinanceDataSummary = {
            balance: '',
        };

        this.requestPerformanceDataSummary = {
            totalTripCount: '',
            billingRevenue: '',
        };

    }

    ngOnInit() {
      this.route.params.subscribe(params => {
            this.driverId = params['id'];
         });
        this.viewDriverFinance(1);
        this.getFinaceSummary();
        this.getPerformanceSummary();
    }

    viewDriverFinance(page)
    {
        this.apiFilters = [
            {field: 'paymentType', operator: Filters.equal, value: this.driverFinaceData['search_keyword']},
            {field: 'dateF', operator: Filters.equal, value: this. helper.formatDate(this.driverFinaceData['dateF'])},
            {field: 'dateT', operator: Filters.equal, value: this. helper.formatDate(this.driverFinaceData['dateT'])},
        ];

        this.apiService
            .withFilters(this.apiFilters)
            .withQueryParams({'id':this.driverId})
            .paginated({
                page: page,
                perPage: 10
            })
            .get(ApiEndpoints.ENDPOINT.LIST_DRIVER_FINACE)
            .subscribe(responce => {
            if(responce.json().data.length > 0){
                this.requestData = responce.json().data;
                this.loading = true;
                this.dataLoading = false;
                this.current_page = responce.json().pagination.current_page;
                this.total_pages = Math.ceil(responce.json().pagination.count / 100);
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
            .withFilters(this.apiFilters)
            .withQueryParams({'id':this.driverId})
            .get(ApiEndpoints.ENDPOINT.LIST_DRIVER_FINACE_PDF)
            .subscribe(responce => {
                this.requestDataPDF = responce.json().data;
                this.dataLoading = false;
            }, err => {
                this.loading = false;
            });

        this.getPerformanceSummary();
    }

    onSubmit()
    {
        this.dataLoading = true;
        this.requestData = [];
        this.requestDataPDF = [];
        this.viewDriverFinance(1);
        this.bool = false;
     }

    checkNxtBtnClick()
    {
        if(this.current_page <= 1){
            return true;
        }else{
            return false;
        }

    }

    getFinaceSummary()
    {
          this.apiService
            .withQueryParams({'id':this.driverId})
            .get(ApiEndpoints.ENDPOINT.LIST_DRIVER_FINACE_SUMMARY)
            .subscribe(responce => {
                this.requestFinanceDataSummary = responce.json().data;
                this.dataLoading = false;
                this.loading = true;
            }, err => {
                this.loading = false;
            });
    }

    getPerformanceSummary()
    {
        this.apiService
            .withFilters(this.apiFilters)
            .withQueryParams({'id':this.driverId})
            .get(ApiEndpoints.ENDPOINT.LIST_DRIVER_PERFORMANCE_SUMMARY)
            .subscribe(responce => {
                this.requestPerformanceDataSummary = responce.json().data;
                this.dataLoading = false;
                this.loading = true;
            }, err => {
                this.loading = false;
            });
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
            {title: "Date", dataKey: "created_date"},
            {title: "Trip ID", dataKey: "trip_id"},
            {title: "Payment Type", dataKey: "payment_type"},
            {title: "Amount", dataKey: "amount"},
        ];

        var rows = this.requestDataPDF;

        // Only pt supported (not mm or in)
        var doc = new jsPDF('p', 'pt');
        doc.autoTable(columns, rows, {
            styles: {
                fillColor: [100, 255, 255],
                //overflow: 'linebreak',
                //halign: 'center'
            },
            columnStyles: {
                //payment_type: {halign: 'center'},
                //amount: {halign: 'right'},
            },
            margin: {top: 60},
            addPageContent: function(data) {
                doc.text("Driver Finance", 40, 30,);
            }
        });
        doc.save('Driver Finance Statement.pdf');
    }

  clearFeilds()
  {
    this.driverFinaceData = {
      search_keyword: '',
      dateF: '',
      dateT: ''
    };
    this.onSubmit();
  }
}
