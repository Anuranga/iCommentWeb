/**
 * Created by Ashain on 2018.
 */

import {Injectable} from "@angular/core";
import { environment } from 'environments/environment';

@Injectable()
export class ApiEndpoints {

  static GOOGLE_MAP_KEY = '';

  // all api endpoints
  static ENDPOINT = {

    // login authenticate api urls
    AUTH: environment.apiPath+'authenticate',
    PERMISSION: environment.apiPath+'role-permissions',

    LOGIN: environment.apiPath+'auth/login',
    LOGOUT: environment.apiPath+'auth/logout',
    TEST: 'https://jsonplaceholder.typicode.com/posts',

    LIST_OWNER_INFO: environment.apiPath+'',
    LIST_DRIVER_INFO: environment.apiPath+'',
    LIST_DRIVER_LOCATION_INFO: environment.apiPath+'',
    LIST_DRIVER_PERFORMANCE: environment.apiPath+'',
    LIST_DRIVER_PERFORMANCE_SUMMARY: environment.apiPath+'',
    LIST_DRIVER_FINACE: environment.apiPath+'',
    LIST_DRIVER_FINACE_PDF: environment.apiPath+'',
    LIST_DRIVER_FINACE_SUMMARY: environment.apiPath+'',
    LIST_DRIVER_BREAKDOWN: environment.apiPath+'',
    LIST_DRIVER_BREAKDOWN_PDF: environment.apiPath+'',
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
