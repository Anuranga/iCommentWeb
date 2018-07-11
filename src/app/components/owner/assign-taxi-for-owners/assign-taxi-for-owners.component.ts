
import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {ApiEndpoints} from '@endpoints/api';
import {ActivatedRoute} from '@angular/router';
import {Helper} from '@core/helper';
import {ApiService} from '@service/api/api.services';
import {Alerts} from '@core/alerts';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Filters} from "@service/api/api.filters";
import {Functions} from '@core/functions';

@Component({
  selector: 'app-assign-taxi-for-owners',
  templateUrl: './assign-taxi-for-owners.component.html',
  styleUrls: ['./assign-taxi-for-owners.component.css']
})
export class AssignTaxiForOwnersComponent implements OnInit {
    public loading = false;
    ownerSearchData: { search_keyword: any; dateF: any; dateT: any};
    requestData:any[];
    current_page:number;
    total_pages:number;
    bool: boolean = true;
    functions: Functions;
    dataLoading : boolean;
  constructor(private apiService: ApiService,
              private apiFilters: Filters,
              private helper: Helper
  )
  {
      this.dataLoading = true;
      this.apiService = apiService;
      this.apiFilters = apiFilters;

      this.ownerSearchData = {
          search_keyword: '',
          dateF: '',
          dateT: ''
      };

      this.functions = new Functions();

  }

  ngOnInit() {
      this.listOwnerInfo(1);
  }

    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngAfterViewInit() {
    }

    onSubmit() {
        this.listOwnerInfo(1);
        this.requestData = [];
        this.bool = false;
    }

    clearFeilds()
    {
        this.ownerSearchData = {
            search_keyword: '',
            dateF: '',
            dateT: ''
        };
        this.onSubmit();
    }

    listOwnerInfo(page)
    {
        this.apiFilters = [
            {field: 'search_keyword', operator: Filters.equal, value: this.ownerSearchData['search_keyword']},
            {field: 'dateF', operator: Filters.equal, value: this. helper.formatDate(this.ownerSearchData['dateF'])},
            {field: 'dateT', operator: Filters.equal, value: this. helper.formatDate(this.ownerSearchData['dateT'])},
        ];

        this.apiService.withFilters(this.apiFilters).paginated({
            page: page,
            perPage: 10
        }).get(ApiEndpoints.ENDPOINT.LIST_OWNER_INFO).subscribe(responce => {
            if(responce.status == ApiEndpoints.RESPONCE_CODE.OK) {
                if(responce.json().data.length > 0){
                    this.requestData = responce.json().data;
                    this.current_page = responce.json().pagination.current_page;
                    this.total_pages = Math.ceil(responce.json().pagination.count / 100);
                    this.loading = true;
                    this.dataLoading = false;
                }else{
                    this.helper.msgAlert('E', 'Records Not Found');
                }
            }
        }, err => {
            this.loading = false;
            alert("Opps!! Error in logout. Please try again later...");
            this.functions.destroySession(this.functions.appName);
            location.href = '/';
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
}

