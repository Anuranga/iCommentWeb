/**
 * Created by Ashain on 2018.
 */

import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {HttpClientModule} from '@angular/common/http';

import {Filters} from './api.filters';
import {Functions} from '@core/functions';

@Injectable()
export class ApiService {

  private http: any;
  private filters: any;
  private pagination: any;
  private functions: Functions;
  private Permission: any;
  private queryPrms: any;

  constructor(http: Http, filters:Filters) {
     this.http = http;
     this.filters = filters;
     this.Permission = "";
     this.functions = new Functions();
  }

  // binds ===================================================

  get(path) {
    return this.build('get', {
      path: path,
      data: ''
    })
  }

  post(path, data) {
    this.clearStatus();
    return this.build('post', {
      path: path,
      data: data
    })
  }

  put(path, data) {
    this.clearStatus();
    return this.build('put', {
      path: path,
      data: data
    })
  }

  patch(path, data) {
    this.clearStatus();
    return this.build('patch', {
      path: path,
      data: data
    })
  }

  delete(path) {
    this.clearStatus();
    return this.build('delete', {
      path: path,
      data: ''
    })
  }

  // helpers =====================================================

  withPermission(route, action) {
    this.Permission = route.toLocaleLowerCase()+'/'+action.toLocaleLowerCase();
    return this;
  }

  withFilters(filters) {
    this.filters = filters;
    return this;
  }

  withQueryParams(prms) {
    this.queryPrms = prms;
    return this;
  }

  paginated(pagination) {
    this.pagination = pagination;
    return this;
  }

  queryParams() {
    //{page: page, perPage: 20}

    let params = {
      filters: (this.filters != undefined && Object.keys(this.filters).length != 0)?JSON.stringify(Filters.prepareFilters(this.filters)):'',
      page: (this.pagination != undefined && Object.keys(this.pagination).length != 0)?JSON.stringify(this.pagination.page):'',
      paging: (this.pagination != undefined && Object.keys(this.pagination).length != 0)?JSON.stringify(this.pagination):''
    };

    return params;
  }

  prepareHeaders() {
    let headers = {};
    let token = this.functions.getToken(); //window.localStorage.getItem('token');
    if (token != null) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    headers["Accept"] = "application/json";

    if(this.Permission != '')
    headers["User-Action"] = this.Permission;

    return headers;
  }

  clearStatus() {
    this.filters = [];
    this.pagination = [];
  }


  build(type, params){

    let queryParams = "?";
    let queryParamsArr = this.queryParams(); // merging objects
    let queryStringArr = this.queryPrms; // merging objects

    // Object.assign(queryParamsArr).forEach(([strPlaceholder, strValue]) => {
    //     if (strValue != '') {
    //     queryParams += strPlaceholder + "=" + encodeURIComponent(<string>strValue) + "&";
    //   }
    // });

    $.each(queryParamsArr, function (strPlaceholder, strValue1) {
      if(strValue1 != ''){
        queryParams += strPlaceholder + "=" + encodeURIComponent(<string>strValue1) + "&";
      }
    });

    // Object.entries(queryStringArr).forEach(([strPlaceholder, strValue]) => {
    //     queryParams += strPlaceholder + "=" + encodeURIComponent(strValue) + "&";
    // });

    $.each(queryStringArr, function (strPlaceholder, strValue) {
      queryParams += strPlaceholder + "=" + encodeURIComponent(strValue) + "&";
    });

    let paramsData = (queryParams.substring(1) != '')?queryParams:'';

    //Set request headers
    let headers = this.prepareHeaders();
    let request;
    let path = params.path+paramsData;

    switch (type) {
      case 'get':
        request = this.http.get(path, { headers: headers });
        break;

      case 'post':
        request = this.http.post(path, params.data, { headers: headers });
        break;

      case 'put':
        request = this.http.put(path, params.data, { headers: headers });
        break;

      case 'patch':
        request = this.http.patch(path, params.data, { headers: headers });
        break;

      case 'delete':
        request = this.http.delete(path, { headers: headers });
        break;

      default:
        console.log('ERROR: (get, post, put...) method not specified...');
        break;
    }

    return request;

  }

}
