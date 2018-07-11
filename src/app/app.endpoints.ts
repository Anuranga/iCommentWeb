/**
 * Created by Ashain on 2018.
 */

import {Injectable} from "@angular/core";
import { environment } from 'environments/environment';

@Injectable()
export class ApiEndpoints {

  static GOOGLE_MAP_KEY = 'AIzaSyBiZomeUUY4Cg0XFMa1CiK6gCOBp9GH9p8';

  // all api endpoints
  static ENDPOINT = {

    // login authenticate api urls
    AUTH: environment.apiPath+'authenticate',
    PERMISSION: environment.apiPath+'role-permissions',

    LOGIN: environment.apiPath+'auth/login',
    LOGOUT: environment.apiPath+'auth/logout',
    TEST: 'https://jsonplaceholder.typicode.com/posts',

    LIST_OWNER_INFO: environment.apiPath+'owner_portal/get_Owner_Info',
    LIST_DRIVER_INFO: environment.apiPath+'owner_portal/get_Driver_Info',
    LIST_DRIVER_LOCATION_INFO: environment.apiPath+'owner_portal/get_Driver_Location',
    LIST_DRIVER_PERFORMANCE: environment.apiPath+'owner_portal/get_Driver_Performance',
    LIST_DRIVER_PERFORMANCE_SUMMARY: environment.apiPath+'owner_portal/get_Driver_Performance_Summary',
    LIST_DRIVER_FINACE: environment.apiPath+'owner_portal/get_Driver_Finance',
    LIST_DRIVER_FINACE_PDF: environment.apiPath+'owner_portal/get_Driver_Finance_PDF',
    LIST_DRIVER_FINACE_SUMMARY: environment.apiPath+'owner_portal/get_Driver_Finance_Summary',
    LIST_DRIVER_BREAKDOWN: environment.apiPath+'owner_portal/get_Driver_Breakdown',
    LIST_DRIVER_BREAKDOWN_PDF: environment.apiPath+'owner_portal/get_Driver_Breakdown_PDF',
  };

  static RESPONCE_CODE = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    PAGE_NOT_FOUND: 404,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    UNPROCESSABLE: 422,
    SERVER_ERROR: 500
  };

  static USER_ACTIONS = {
    ADD: 'add',
    EDIT: 'edit',
    VIEW: 'view',
  };

}
